interface Product {
    name: string,
    price: number
}

class CardProduct implements Product {
    constructor(public readonly name: string,
                public readonly price: number,
                public readonly image_url: string
    ) {
    }
}

class BasketProduct implements Product {
    constructor(public readonly name: string,
                public readonly price: number,
                public count: number
    ) {
    }
}

const productCards: Array<CardProduct> = [
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
    new CardProduct(
        "Оперативная память 8 ГБ",
        5000,
        "https://img.mvideo.ru/Pdb/30032538b.jpg"
    ),
    new CardProduct(
        "Оперативная память 16 ГБ",
        9000,
        "https://img.mvideo.ru/Pdb/30032538b.jpg"
    ),
    new CardProduct(
        "Оперативная память 32 ГБ",
        16000,
        "https://img.mvideo.ru/Pdb/30032538b.jpg"
    ),
    new CardProduct(
        "Компьютерный корпус",
        4500,
        "https://musmag.com/images/stories/virtuemart/product/fr1.png"
    ),
    new CardProduct(
        "Компьютерная мышь Bloody R30",
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
const basket_items: Array<BasketProduct> = [];

// Create product cards
const products_menu: HTMLElement | null = document.querySelector(".products-menu");
const card_template: HTMLTemplateElement | null = document.querySelector("#product-card-template");
if (!products_menu || !card_template)
    throw new TypeError("Unable to find products menu or product card template!");

productCards.forEach((card: CardProduct) => {
    const newCard: HTMLElement = <HTMLElement>(card_template.content.cloneNode(true));
    if (!newCard)
        throw new TypeError("Unable to create a new card!");

    // newCard.querySelector(".product-card").id = `card_${index}`;
    (<HTMLImageElement>newCard.querySelector(".product-card-image")).src = card.image_url;
    newCard.querySelector(".product-card-name")!.textContent = card.name;
    newCard.querySelector(".product-card-price")!.textContent = `${card.price} RUB`;
    
    const basket_button: HTMLButtonElement | null = (<HTMLElement>newCard).querySelector(".product-card-button");
    if (!basket_button)
        throw new TypeError("Unable to find basket button in card product template!");

    basket_button.textContent = "Добавить в корзину"
    basket_button.addEventListener("click", () => {
        // Check if product exists in the basket
        if (basket_items.filter((product) => product.name === card.name).length) {
            // Get index of existing product
            const index: number = basket_items.map((item) => {
                return item.name;
            }).indexOf(card.name);
            basket_items[index].count += 1;
        } else {
            basket_items.push(new BasketProduct(card.name, card.price, 1));
        }
    });
    products_menu.appendChild(newCard);
});


// Make basket functional
const basket_open_button: HTMLElement | null = document.querySelector("#basket-open-button");
if (!basket_open_button)
    throw new TypeError("Unable to find open basket button!");

basket_open_button.addEventListener("click", () => {
    const popup_template: HTMLTemplateElement | null = document.querySelector("#popup-template");
    if (!popup_template)
        throw new TypeError("Unable to find popup template!");

    const popup_content: HTMLDivElement = <HTMLDivElement>(popup_template.content.cloneNode(true));
    const basket: HTMLElement = <HTMLElement>((<HTMLTemplateElement>popup_content.querySelector("#basket-template")).content.cloneNode(true));
    if (!popup_content)
        throw new TypeError("Unable to find popup content!");

    popup_content.querySelector(".popup-background")!.appendChild(basket);
    popup_content.querySelector(".basket-close-button")!.addEventListener("click", () => {
        const background: HTMLElement | null = document.querySelector(".popup-background")
        if (!background) {
            throw new TypeError("Background is null! Can\'t close popup!");
        }
        background.remove();
    });
    popup_template.parentElement!.insertBefore(popup_content, popup_template.parentElement!.firstChild);

    const basket_list: HTMLElement | null = document.querySelector(".basket-list");
    const basket_template: HTMLTemplateElement | null = document.querySelector("#basket-item-template");
    if (!basket_list || !basket_template)
        throw new TypeError("Unable to find basket list or template!");

    basket_items.forEach((item: BasketProduct) => {
        const newBasketItem: HTMLElement = <HTMLElement>(basket_template.content.cloneNode(true));
        if (!newBasketItem)
            throw new TypeError("The clone of basket item template is null!")

        newBasketItem.querySelector(".basket-item-name")!.textContent = item.name;
        newBasketItem.querySelector(".basket-item-count")!.textContent = item.count.toString();
        newBasketItem.querySelector(".basket-item-price")!
            .textContent = `${item.count * item.price} RUB`;
        basket_list.appendChild(newBasketItem);
    })
})

