export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
