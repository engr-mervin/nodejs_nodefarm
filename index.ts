import http from "node:http";
import url from "node:url";
import fs from "node:fs";
import path from "node:path";
import slugify from "./node_modules/slugify/slugify.js";
import buildOverviewHTML from "./lib/buildOverviewHTML.js";
import { ProductData } from "./types/types";
import getQueryParams from "./lib/getQueryParams.js";
import buildProductHTML from "./lib/buildProductHTML.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

let apiData: ProductData[] = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
);

apiData = apiData.map((el) => {
  return { ...el, slugName: slugify(el.productName, { lower: true }) };
});

const overviewHTML: string | null = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const cardHTML: string | null = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const productHTML: string | null = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const server: http.Server = http.createServer((req, res) => {
  const pathName: string = req.url as string;

  if (pathName === "/favicon.ico") return;

  getQueryParams(pathName);

  if (pathName?.startsWith("/overview") || pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    res.end(buildOverviewHTML(overviewHTML, cardHTML, apiData));
  } else if (pathName?.startsWith("/product")) {
    res.writeHead(200, { "Content-type": "text/html" });

    // const params: { [key: string]: any } = getQueryParams(pathName);

    // const id: number = Number(params.product.id);

    const slug: string | undefined = req.url?.split("/")[2];

    const id = apiData.findIndex((el) => {
      return el.slugName === slug;
    });

    if (id === -1) {
      return res.end("Product not found.");
    }

    console.log(slug);

    res.end(buildProductHTML(productHTML, apiData[id]));
  } else {
    res.writeHead(404, { "Content-type": "text/html" });

    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
