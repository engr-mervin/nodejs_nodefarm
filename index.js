import http from "node:http";
import url from "node:url";
import fs from "node:fs";
import path from "node:path";
import buildOverviewHTML from "./lib/buildOverviewHTML.js";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
console.log(__dirname);
// type CallBackErrData = (err: string | null, data: any) => void;
// type CallBackData = (data: any) => any;
const apiData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"));
const overviewHTML = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const cardHTML = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === "/favicon.ico")
        return;
    if ((pathName === null || pathName === void 0 ? void 0 : pathName.startsWith("/overview")) || pathName === "/") {
        res.end(buildOverviewHTML(overviewHTML, cardHTML, apiData));
    }
    else if (pathName === null || pathName === void 0 ? void 0 : pathName.startsWith("/product")) {
        res.end("This is the PRODUCT");
    }
    else {
        res.writeHead(404, { "Content-type": "text/html", "my-own-header": "yow" });
        res.end("<h1>Page not found</h1>");
    }
});
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000");
});
