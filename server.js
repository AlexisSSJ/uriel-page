const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";
const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");

app.disable("x-powered-by");

if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
}

app.use("/assets", express.static(path.join(ROOT, "assets")));
app.use("/css", express.static(path.join(ROOT, "css")));
app.use("/js", express.static(path.join(ROOT, "js")));

app.get(["/cv", "/cv.html"], (_req, res) => {
  res.sendFile(path.join(ROOT, "cv.html"));
});

app.get(["/", "/index.html"], (_req, res) => {
  const target = fs.existsSync(path.join(DIST, "index.html"))
    ? path.join(DIST, "index.html")
    : path.join(ROOT, "index.html");
  res.sendFile(target);
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
