import buildProductHTML from "./buildProductHTML.js";
const buildOverviewHTML = function (html, cardHTML, data) {
    const cardsHTML = data.map((el) => buildProductHTML(cardHTML, el)).join("");
    return html.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);
};
export default buildOverviewHTML;
