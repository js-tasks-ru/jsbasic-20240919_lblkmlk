import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    document.body.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.body.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.body.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.body.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    let products = null;

    const response = await fetch('products.json');

    if (response.ok) {
      products = await response.json();
    }
    else {
      alert('ERROR:', response.status);
    }

    this.productsGrid = new ProductsGrid(products);

    const productsGridHolder = document.body.querySelector('[data-products-grid-holder]');

    productsGridHolder.innerHTML = '';
    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    document.body.addEventListener('product-add', e => {
      const productId = e.detail;
      const product = products.find(product => product.id === productId);

      this.cart.addProduct(product);
    });

    document.body.addEventListener('slider-change', e => {
      const value = e.detail;

      this.productsGrid.updateFilter({
        maxSpiciness: value,
      });
    });

    document.body.addEventListener('ribbon-select', e => {
      const categoryId = e.detail;

      this.productsGrid.updateFilter({
        category: categoryId,
      });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', e => {
      this.productsGrid.updateFilter({
        noNuts: e.target.checked,
      });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', e => {
      this.productsGrid.updateFilter({
        vegeterianOnly: e.target.checked,
      });
    });
  }
}