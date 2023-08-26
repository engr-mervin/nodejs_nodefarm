import { ProductData } from "../types/types";

const buildCardHTML = function (html: string, data: ProductData): string {
  html = html.replace(/{%IMAGE%}/g, data.image);
  html = html.replace(/{%ID%}/g, String(data.id));
  html = html.replace(/{%PRODUCTNAME%}/g, data.productName);
  html = html.replace(/{%QUANTITY%}/g, data.image);
  html = html.replace(/{%PRICE%}/g, data.price);

  if (!data.organic) {
    html.replace(/{%NOT_ORGANIC%}/, "not-organic");
  } else {
    html.replace(/{%NOT_ORGANIC%}/, "");
  }
  return html;
};

export default buildCardHTML;
