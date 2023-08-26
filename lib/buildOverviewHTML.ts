import { ProductData } from "../types/types";
import buildCardHTML from "./buildCardHTML.js";

const buildOverviewHTML = function (
  html: string,
  cardHTML: string,
  data: ProductData[]
): string {
  let cardsHTML: string = "";
  data.forEach((productData) => {
    cardsHTML += buildCardHTML(cardHTML, productData);
  });

  console.log(cardsHTML);
  html = html.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);

  return html;
};

export default buildOverviewHTML;
