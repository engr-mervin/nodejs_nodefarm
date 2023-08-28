import { ProductData } from "../types/types";
import buildProductHTML from "./buildProductHTML.js";

const buildOverviewHTML = function (
  html: string,
  cardHTML: string,
  data: ProductData[]
): string {
  const cardsHTML = data.map((el) => buildProductHTML(cardHTML, el)).join("");

  return html.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);
};

export default buildOverviewHTML;
