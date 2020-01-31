const DOM = {
    appDiv: document.querySelector('#app'),
};

class Product {
    constructor(title = 'DEFAULT', imageUrl = 'img.jpg', price = 0, description = 'foobar') {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    };
}

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId) {
        this.hookId = renderHookId;
    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const elem of attributes) {
                rootElement.setAttribute(elem.name, elem.value, );
            }
        }
        document.querySelector(`#${this.hookId}`).append(rootElement);
        return rootElement;
    }
}

//in this part we need the static helper class for ShoppingCart
class ProductItem extends Component{ //only for render the element for the list
    // This constructor will have all "blueprint" that you originally created
    constructor(product, renderHookId) {
        super(renderHookId);
        this.product = product;
    };

    addToCart() {
        // console.log('addtocart', this.product);
        // ShoppingCart.addProduct(this.product); //this does not work because it's not instance
        // because we're not working on objects based on classes but on the class itself to share some data
        // share the cart instance for example
        App.addProductToCart(this.product);
    };

    render = () => {
        // const prodElem = document.createElement('li');
        // prodElem.className = 'product-item';
        // prodElem.innerHTML = `
        //     <div>
        //         <img src="${this.product.imageURL}" alt="${this.product.title}">
        //         <div class="product-item__content">
        //             <h2>${this.product.title}</h2>
        //             <h3>$ ${this.product.price}</h3>
        //             <p>${this.product.description}</p>
        //             <button>Add to cart</button>
        //         </div>
        //     </div>`;
        const prodElem = this.createRootElement('li', 'product-item');
        prodElem.innerHTML = `
            <div>
                <img src="${this.product.imageURL}" alt="${this.product.title}">
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>$ ${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to cart</button>
                </div>
            </div>`;

        const addCartButton = prodElem.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));

        return prodElem;
    }
}

class ProductList extends Component{
    products = [
        new Product('pillow', 'foobar', 39.99, 'a fucking piece of beautiful delicious sexy pillow'),
        new Product('rug', 'foobar', 69.99, 'a big heavy old fucking rug that maybe you will like it or not'),
    ];

    constructor(renderHookId) {
        super(renderHookId);};

    render() {
        // const prodList = document.createElement('ul');
        // prodList.className = 'product-item';
        // for (const prod of this.products) {
        //     const productItem = new ProductItem(prod);
        //     prodList.append(productItem.render());
        // }
        // // DOM.appDiv.append(prodList);
        // return prodList;
        const prodList = this.createRootElement('ul', 'product-item', [new ElementAttribute('id', 'prod-list')]);

        for (const prod of this.products) {
            const productItem = new ProductItem(prod, 'prod-list');
            productItem.render();
        }
    };
}

//in this part is necessary a static class
class ShoppingCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>\$ ${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        return this.items.reduce((prevValue, currValue) =>
            parseFloat(prevValue + currValue.price), 0);
    };

    constructor(renderHookId) {
        super(renderHookId);
    }


    addProduct(product) {
        // this.items.push(product);
        // this.totalOutput.innerHTML = `<h2>\$ ${this.totalAmount}</h2>`;
        // this.render();
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    };

    render() {
        // console.log('in the render from the shoppingcart', this.items);
        // const cartEl = document.createElement('section');
        // cartEl.innerHTML = `
        // <h2>Total: $${this.items.price}</h2>
        // <button>Order Product</button>
        // `;
        //
        // cartEl.className = 'cart';
        // this.totalOutput = cartEl.querySelector('h2');
        //
        // return cartEl;
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
        <h2>Total: $${this.items.price}</h2>
        <button>Order Product</button>
        `;
        this.totalOutput = cartEl.querySelector('h2');
    };
}

//Static class helper
class Shop {

    render() {
        // const cart = new ShoppingCart();

        //it's a static class where it will trigger first an empty cart before creating the product list
        this.cart = new ShoppingCart('app');
        // const cartEl = this.cart.render();
        this.cart.render();

        const productList = new ProductList('app');
        // const prodEl = productList.render();
        productList.render();

        // DOM.appDiv.append(cartEl);
        // DOM.appDiv.append(prodEl);
    }
}

class App {
    static cart; //we refer this cart to the class itself, doesn't try to an object based on the class

    static init() {
        const shop = new Shop();
        // const { } = shop;
        shop.render();

        this.cart = shop.cart; // is the instance ShoppingCart(_);

    };

    // static class helper
    static addProductToCart(product) {
        // console.log('in the static class helper add prod to cart',product);
        // this.cart.addProduct(product)
        this.cart.addProduct(product); //TODO: it's an static instance from the class Shop -> this.cart = new ShoppingCart() -> addProduct() {}

    };
}

App.init();
