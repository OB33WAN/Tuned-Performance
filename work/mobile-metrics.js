const { spawn } = require("child_process");
const http = require("http");
const fs = require("fs");
const path = require("path");

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const root = path.resolve(__dirname, "..");
const pagePath = path.join(root, "outputs", "index.html");
const profile = path.join(root, "work", "qa-logo", "cdp-profile");
fs.mkdirSync(profile, { recursive: true });

const url = `file:///${pagePath.replace(/\\/g, "/")}`;
const port = 9233;
const browser = spawn(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--force-device-scale-factor=1",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--window-size=390,900",
  url
], { stdio: "ignore" });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getJson = (targetUrl) => new Promise((resolve, reject) => {
  http.get(targetUrl, (res) => {
    let data = "";
    res.on("data", (chunk) => { data += chunk; });
    res.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
  }).on("error", reject);
});

async function getTarget() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const tabs = await getJson(`http://127.0.0.1:${port}/json/list`);
      const tab = tabs.find((item) => item.type === "page" && item.webSocketDebuggerUrl);
      if (tab) return tab;
    } catch {
      await wait(250);
    }
  }
  throw new Error("Chrome debugging target not available");
}

let id = 0;
const send = (socket, method, params = {}) => new Promise((resolve, reject) => {
  const messageId = ++id;
  const onMessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id !== messageId) return;
    socket.removeEventListener("message", onMessage);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  };
  socket.addEventListener("message", onMessage);
  socket.send(JSON.stringify({ id: messageId, method, params }));
});

(async () => {
  const target = await getTarget();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  await send(socket, "Runtime.enable");
  await send(socket, "Page.enable");
  await send(socket, "Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 900,
    deviceScaleFactor: 1,
    mobile: true
  });
  await send(socket, "Page.navigate", { url });
  await wait(1000);
  const expression = `(() => {
    const viewport = {
      innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth
    };
    const offenders = [...document.body.querySelectorAll("*")]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          id: element.id || "",
          className: typeof element.className === "string" ? element.className : "",
          text: (element.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        };
      })
      .filter((item) => item.right > innerWidth + 1 || item.left < -1)
      .sort((a, b) => b.right - a.right)
      .slice(0, 20);
    return { viewport, offenders };
  })()`;
  const result = await send(socket, "Runtime.evaluate", {
    expression,
    returnByValue: true
  });
  const shot = await send(socket, "Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false
  });
  fs.writeFileSync(
    path.join(root, "work", "qa-logo", "index-logo-mobile-cdp.png"),
    Buffer.from(shot.data, "base64")
  );
  console.log(JSON.stringify(result.result.value, null, 2));
  socket.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => {
  browser.kill();
});
