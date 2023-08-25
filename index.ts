import http from "http";
import url from "url";
import fs from "fs";

//SYNCHRONOUS (BLOCKING)
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

//ASYNCHRONOUS(NON-BLOCKING)
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR! 👌");
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", () => {
//         return;
//       });
//     });
//   });
// });

// console.log("Will read file");
////////////////////////////////////////////////////////////
//SERVER
////////////////////////////////////////////////////////////
let apiData: string | undefined;
const server: http.Server = http.createServer((req, res) => {
  const pathName: string = req.url as string;

  if (pathName === "/favicon.ico") return;
  // console.log(req.url);

  //////////////////////////////////////////////////////////////
  //OVERVIEW
  /////////////////////////////////////////////////////////////
  if (pathName?.startsWith("/overview") || pathName === "/") {
    res.end("Hello from the server!");
  }

  //////////////////////////////////////////////////////////////
  //API
  /////////////////////////////////////////////////////////////
  else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    if (apiData) return res.end(apiData);
    fs.readFile(`./dev-data/data.json`, "utf-8", (err, data) => {
      if (err) {
        return res.end("Something went wrong");
      }
      // const productData = JSON.parse(data);
      // console.log(productData);
      apiData = data;
      res.end(data);
    });
  }
  //////////////////////////////////////////////////////////////
  //PRODUCT
  /////////////////////////////////////////////////////////////
  else if (pathName?.startsWith("/product")) {
    res.end("This is the PRODUCT");
  } else {
    res.writeHead(404, { "Content-type": "text/html", "my-own-header": "yow" });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
