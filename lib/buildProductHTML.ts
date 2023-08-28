import { ProductData } from "../types/types";

const buildProductHTML = function (html: string, data: ProductData): string {
  let output = html.replace(/{%IMAGE%}/g, data.image);
  output = output.replace(/{%ID%}/g, String(data.id));
  output = output.replace(/{%PRODUCTNAME%}/g, data.productName);
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  output = output.replace(/{%PRICE%}/g, data.price);
  output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, data.description);
  output = output.replace(/{%FROM%}/g, data.from);
  output = output.replace(/{%SLUG_NAME%}/g, data.slugName ? data.slugName : "");

  if (!data.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/, "not-organic");
    output = output.replace(/{%ORGANIC%}/g, "Not Organic.");
  } else {
    output = output.replace(/{%NOT_ORGANIC%}/, "");
    output = output.replace(/{%ORGANIC%}/g, "Organic!");
  }
  return output;
};

export default buildProductHTML;
