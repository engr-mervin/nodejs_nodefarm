import buildCardHTML from "./buildCardHTML.js";
const buildOverviewHTML = function (html, cardHTML, data) {
    let cardsHTML = "";
    data.forEach((productData) => {
        cardsHTML += buildCardHTML(cardHTML, productData);
    });
    console.log(cardsHTML);
    html = html.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);
    return html;
};
export default buildOverviewHTML;
