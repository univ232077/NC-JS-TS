"use strict";

// Product is an abstract class, it needs to be inherited.
class Product {
    constructor(name, price) {
        if (this.constructor === Product) {
            throw new Error("Product is an abstract class!");
        }

        this.name = name;
        this.price = price;
    }
}

class CardProduct extends Product {
    constructor(name, price, image_url) {
        super(name, price);
        this.image_url = image_url;
    }
}

class BasketProduct extends Product {
    constructor(name, price, count) {
        super(name, price);
        this.count = count;
    }
}

const cards = [
    new CardProduct(
        "Оперативная память 2 ГБ",
        1000,
        "https://img.mvideo.ru/Pdb/30032538b.jpg"
    ),
    new CardProduct(
        "Оперативная память 4 ГБ",
        2500,
        "https://img.mvideo.ru/Pdb/30032538b.jpg"
    ),
    new CardProduct("Оперативная память 8 ГБ",
        5000,
        "https://img.mvideo.ru/Pdb/30032538b.jpg"
    ),
    new CardProduct("Оперативная память 16 ГБ",
        9000,
        "https://img.mvideo.ru/Pdb/30032538b.jpg"
    ),
    new CardProduct("Оперативная память 32 ГБ",
        16000,
        "https://img.mvideo.ru/Pdb/30032538b.jpg"
    ),
    new CardProduct("Компьютерный корпус",
        4500,
        "https://musmag.com/images/stories/virtuemart/product/fr1.png"
    ),
    new CardProduct("Компьютерная мышь Bloody R30",
        1300,
        "http://img.bloody.com/en/uploadfile/image/20161012/20161012065850_85014.jpg"
    ),
    new CardProduct(
        "Компьютерная мышь",
        300,
        "https://upload.wikimedia.org/wikipedia/commons/2/22/3-Tasten-Maus_Microsoft.jpg"
    ),
];

// Basket items buffer
const basket_items = [];

const products_menu = document.querySelector(".products-menu");
const card_template = document.querySelector("#product-card-template");
if (products_menu && card_template) {
    cards.forEach((card, index) => {
        const newCard = card_template.content.cloneNode(true);
        newCard.querySelector(".product-card").id = `card_${index}`;
        newCard.querySelector(".product-card-image").src = card.image_url;
        newCard.querySelector(".product-card-name").textContent = card.name;
        newCard.querySelector(".product-card-price").textContent = `${card.price} RUB`;
        const basket_button = newCard.querySelector(".product-card-button");
        basket_button.textContent = "Добавить в корзину"
        basket_button.addEventListener("click", () => {
            // Check if product exists in the basket
            if (basket_items.filter((product) => product.name === card.name).length) {
                // Get index of existing product
                const index = basket_items.map((item) => {
                    return item.name;
                }).indexOf(card.name);
                basket_items[index].count += 1;
            } else {
                basket_items.push(new BasketProduct(card.name, card.price, 1));
            }
        });
        products_menu.appendChild(newCard);
    });
} else {
    throw new Error("Product cards exception");
}

const basket_open_button = document.querySelector("#basket-open-button");
if (basket_open_button) {
    basket_open_button.addEventListener("click", () => {
        const popup_template = document.querySelector("#popup-template");
        if (popup_template) {
            const popup_content = popup_template.content.cloneNode(true);
            const basket = popup_content.querySelector("#basket-template").content.cloneNode(true);
            popup_content.querySelector(".popup-background").appendChild(basket);

            popup_content.querySelector(".basket-close-button")
                .addEventListener("click",
                    () => document.querySelector(".popup-background").remove());

            popup_template.parentElement.insertBefore(popup_content, popup_template.parentElement.firstChild);
            const basket_list = document.querySelector(".basket-list");
            const basket_template = document.querySelector("#basket-item-template");

            if (basket_list && basket_template) {
                basket_items.forEach((item) => {
                    const newBasketItem = basket_template.content.cloneNode(true);
                    newBasketItem.querySelector(".basket-item-name").textContent = item.name;
                    newBasketItem.querySelector(".basket-item-count").textContent = item.count;
                    newBasketItem.querySelector(".basket-item-price")
                        .textContent = `${item.count * item.price} RUB`;
                    basket_list.appendChild(newBasketItem);
                })
            } else {
                throw new Error("Unable to find basket list or template!");
            }
        }
    });
} else {
    throw new Error("Basket popup button is missing")
}

