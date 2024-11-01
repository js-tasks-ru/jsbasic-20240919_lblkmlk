import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    if (!this.isEmpty()) {
      const productIndex = this.cartItems.findIndex(item => item.product.id === product.id);

      if (productIndex !== -1) {
        this.updateProductCount(this.cartItems[productIndex].product.id, 1);
        this.onProductUpdate(this.cartItems[productIndex]);
        return;
      }
    }

    const cartItem = {
      product,
      count: 1,
    };

    this.cartItems.push(cartItem);
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const productIndex = this.cartItems.findIndex(item => item.product.id === productId);
    const cartItem = this.cartItems[productIndex];

    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems.splice(productIndex, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((amount, cart) => amount += cart.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((amount, cart) => amount += cart.product.price * cart.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    
    const modalBodyInner = createElement('<div></div>');

    this.cartItems.forEach(item => {
      const cart = this.renderProduct(item.product, item.count);

      cart.querySelector('.cart-counter__button_minus').onclick = () => {
        this.updateProductCount(item.product.id, -1);
      };
      cart.querySelector('.cart-counter__button_plus').onclick = () => {
        this.updateProductCount(item.product.id, 1);
      };

      modalBodyInner.append(cart);
    });

    const form = this.renderOrderForm();
    
    form.addEventListener('submit', e => this.onSubmit(e));
    modalBodyInner.append(form);

    this.modal.setTitle('Your order');
    this.modal.setBody(modalBodyInner);
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }

    if (this.isEmpty()) {
      this.modal.close();
      return;
    }

    const productCart = this.modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"]`);
    const productCount = this.modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
    const productPrice = this.modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
    const infoPrice = this.modal.elem.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

    if (cartItem.count === 0) {
      productCart.remove();
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    const form = this.modal.elem.querySelector('.cart-form');

    form.querySelector('button[type="submit"]').classList.add('is-loading');
    
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),
    });

    if (response.ok) {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.modal.setBody(createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`));
    }
    else {
      alert('ERROR:', response.status);
    }

    this.cartIcon.update(this);
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
