import http from "node:http";
import url from "node:url";
import fs from "node:fs";
import path from "node:path";
import slugify from "./node_modules/slugify/slugify.js";
import buildOverviewHTML from "./lib/buildOverviewHTML.js";
import getQueryParams from "./lib/getQueryParams.js";
import buildProductHTML from "./lib/buildProductHTML.js";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let apiData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"));
apiData = apiData.map((el) => {
    return Object.assign(Object.assign({}, el), { slugName: slugify(el.productName, { lower: true }) });
});
const overviewHTML = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const cardHTML = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const productHTML = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
const server = http.createServer((req, res) => {
    var _a;
    const pathName = req.url;
    if (pathName === "/favicon.ico")
        return;
    getQueryParams(pathName);
    if ((pathName === null || pathName === void 0 ? void 0 : pathName.startsWith("/overview")) || pathName === "/") {
        res.writeHead(200, { "Content-type": "text/html" });
        res.end(buildOverviewHTML(overviewHTML, cardHTML, apiData));
    }
    else if (pathName === null || pathName === void 0 ? void 0 : pathName.startsWith("/product")) {
        res.writeHead(200, { "Content-type": "text/html" });
        // const params: { [key: string]: any } = getQueryParams(pathName);
        // const id: number = Number(params.product.id);
        const slug = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/")[2];
        const id = apiData.findIndex((el) => {
            return el.slugName === slug;
        });
        if (id === -1) {
            return res.end("Product not found.");
        }
        console.log(slug);
        res.end(buildProductHTML(productHTML, apiData[id]));
    }
    else {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end("<h1>Page not found</h1>");
    }
});
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000");
});
