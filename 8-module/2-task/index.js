import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.cardNodes = [];

    this.render();
  }

  render() {
    this.elem = createElement(`<div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);

    this.productsGrid = this.elem.querySelector('.products-grid__inner');
    this.setCards();
  }

  updateFilter(filters = {}) {
    Object.assign(this.filters, filters);
    this.setCards();
  }

  setCards() {
    this.cardNodes.forEach(node => node.remove());
    this.cardNodes = [];

    for (let i = 0; i < this.products.length; i++) {
      let isValidCard = true;

      if (this.filters.noNuts && this.products[i].nuts) {
        isValidCard = false;
      }
      if (this.filters.vegeterianOnly && !this.products[i].vegeterian) {
        isValidCard = false;
      }
      if (this.filters.maxSpiciness && this.products[i].spiciness > this.filters.maxSpiciness) {
        isValidCard = false;
      }
      if (this.filters.category && this.products[i].category !== this.filters.category) {
        isValidCard = false;
      }

      if (isValidCard) {
        const card = new ProductCard(this.products[i]);

        this.cardNodes.push(card.elem);
        this.productsGrid.append(card.elem);
      }
    }
  }
}