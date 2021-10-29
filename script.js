"use strict";
var CardProduct = (function () {
    function CardProduct(name, price, image_url) {
        this.name = name;
        this.price = price;
        this.image_url = image_url;
    }
    return CardProduct;
}());
var BasketProduct = (function () {
    function BasketProduct(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }
    return BasketProduct;
}());
var productCards = [
    new CardProduct("Оперативная память 2 ГБ", 1000, "https://img.mvideo.ru/Pdb/30032538b.jpg"),
    new CardProduct("Оперативная память 4 ГБ", 2500, "https://img.mvideo.ru/Pdb/30032538b.jpg"),
    new CardProduct("Оперативная память 8 ГБ", 5000, "https://img.mvideo.ru/Pdb/30032538b.jpg"),
    new CardProduct("Оперативная память 16 ГБ", 9000, "https://img.mvideo.ru/Pdb/30032538b.jpg"),
    new CardProduct("Оперативная память 32 ГБ", 16000, "https://img.mvideo.ru/Pdb/30032538b.jpg"),
    new CardProduct("Компьютерный корпус", 4500, "https://musmag.com/images/stories/virtuemart/product/fr1.png"),
    new CardProduct("Компьютерная мышь Bloody R30", 1300, "http://img.bloody.com/en/uploadfile/image/20161012/20161012065850_85014.jpg"),
    new CardProduct("Компьютерная мышь", 300, "https://upload.wikimedia.org/wikipedia/commons/2/22/3-Tasten-Maus_Microsoft.jpg"),
];
var basket_items = [];
var products_menu = document.querySelector(".products-menu");
var card_template = document.querySelector("#product-card-template");
if (!products_menu || !card_template)
    throw new TypeError("Unable to find products menu or product card template!");
productCards.forEach(function (card) {
    var newCard = (card_template.content.cloneNode(true));
    if (!newCard)
        throw new TypeError("Unable to create a new card!");
    newCard.querySelector(".product-card-image").src = card.image_url;
    newCard.querySelector(".product-card-name").textContent = card.name;
    newCard.querySelector(".product-card-price").textContent = card.price + " RUB";
    var basket_button = newCard.querySelector(".product-card-button");
    if (!basket_button)
        throw new TypeError("Unable to find basket button in card product template!");
    basket_button.textContent = "Добавить в корзину";
    basket_button.addEventListener("click", function () {
        if (basket_items.filter(function (product) { return product.name === card.name; }).length) {
            var index = basket_items.map(function (item) {
                return item.name;
            }).indexOf(card.name);
            basket_items[index].count += 1;
        }
        else {
            basket_items.push(new BasketProduct(card.name, card.price, 1));
        }
    });
    products_menu.appendChild(newCard);
});
var basket_open_button = document.querySelector("#basket-open-button");
if (!basket_open_button)
    throw new TypeError("Unable to find open basket button!");
basket_open_button.addEventListener("click", function () {
    var popup_template = document.querySelector("#popup-template");
    if (!popup_template)
        throw new TypeError("Unable to find popup template!");
    var popup_content = (popup_template.content.cloneNode(true));
    var basket = (popup_content.querySelector("#basket-template").content.cloneNode(true));
    if (!popup_content)
        throw new TypeError("Unable to find popup content!");
    popup_content.querySelector(".popup-background").appendChild(basket);
    popup_content.querySelector(".basket-close-button").addEventListener("click", function () {
        var background = document.querySelector(".popup-background");
        if (!background) {
            throw new TypeError("Background is null! Can\'t close popup!");
        }
        background.remove();
    });
    popup_template.parentElement.insertBefore(popup_content, popup_template.parentElement.firstChild);
    var basket_list = document.querySelector(".basket-list");
    var basket_template = document.querySelector("#basket-item-template");
    if (!basket_list || !basket_template)
        throw new TypeError("Unable to find basket list or template!");
    basket_items.forEach(function (item) {
        var newBasketItem = (basket_template.content.cloneNode(true));
        if (!newBasketItem)
            throw new TypeError("The clone of basket item template is null!");
        newBasketItem.querySelector(".basket-item-name").textContent = item.name;
        newBasketItem.querySelector(".basket-item-count").textContent = item.count.toString();
        newBasketItem.querySelector(".basket-item-price")
            .textContent = item.count * item.price + " RUB";
        basket_list.appendChild(newBasketItem);
    });
});
