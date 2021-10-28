

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class BasketProduct extends Product {
    constructor(name, price, count) {
        super(name, price);
        this.count = count;
    }
}

class ProductCard extends Product {
    constructor(name, price, image_url) {
        super(name, price);
        this.image_url = image_url;
    }
}

const cards = [
    new ProductCard("Оперативная память 2 ГБ", 1000, "https://img.mvideo.ru/Pdb/30032538b.jpg"),
    new ProductCard("Оперативная память 4 ГБ", 2500, "https://img.mvideo.ru/Pdb/30032538b.jpg"),
    new ProductCard("Оперативная память 8 ГБ", 5000, "https://img.mvideo.ru/Pdb/30032538b.jpg"),
    new ProductCard("Оперативная память 16 ГБ", 9000, "https://img.mvideo.ru/Pdb/30032538b.jpg"),
    new ProductCard("Оперативная память 32 ГБ", 16000, "https://img.mvideo.ru/Pdb/30032538b.jpg"),
    new ProductCard("Компьютерный корпус", 4500, "https://musmag.com/images/stories/virtuemart/product/fr1.png"),
    new ProductCard("Компьютерная мышь Bloody R30", 1300, "http://img.bloody.com/en/uploadfile/image/20161012/20161012065850_85014.jpg"),
    new ProductCard("Компьютерная мышь", 300, "https://upload.wikimedia.org/wikipedia/commons/2/22/3-Tasten-Maus_Microsoft.jpg"),
];

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
        const addtobasket_button = newCard.querySelector(".product-card-button");
        addtobasket_button.textContent = "Добавить в корзину"
        addtobasket_button.addEventListener("click", () => {
            // Check if product exists in the basket
            if (basket_items.filter((product) => product.name === card.name).length) {
                // Get index of existing product
                const index = basket_items.map((item) => { return item.name; }).indexOf(card.name);
                basket_items[index].count += 1;
            } else {
                basket_items.push(new BasketProduct(card.name, card.price, 1));
            }
        });
        products_menu.appendChild(newCard);
    });
} else {
    throw("product cards exception");
}

const basket_open_button = document.querySelector("#basket-open-button");
if (basket_open_button) {
    basket_open_button.addEventListener("click", () => {
        console.log("open popup");
        
        const popup = document.querySelector("#popup-template");
        if (popup){
            popup_content = popup.content.cloneNode(true);
            const basket = popup_content.querySelector("#basket-template").content.cloneNode(true);
            popup_content.querySelector(".popup-background").appendChild(basket);
            
            popup_content.querySelector(".basket-close-button").addEventListener("click", () => document.querySelector(".popup-background").remove());

            popup.parentElement.insertBefore(popup_content, popup.parentElement.firstChild);
            const basket_list = document.querySelector(".basket-list");
            const basket_template = document.querySelector("#basket-item-template");

            console.log(basket_list);
            console.log(basket_template);

            if (basket_list && basket_template) {
                basket_items.forEach((item) => {
                    const newBasketItem = basket_template.content.cloneNode(true);
                    newBasketItem.querySelector(".basket-item-name").textContent = item.name;
                    newBasketItem.querySelector(".basket-item-count").textContent = item.count;
                    newBasketItem.querySelector(".basket-item-price").textContent = `${item.count * item.price} RUB`;
                    basket_list.appendChild(newBasketItem);
                })
            } else {
                throw("ERROR: Unable to find basket list or template!");
            }
        }
    });
} else {
    throw("EXCEPTION: basket popup button is missing");
}


