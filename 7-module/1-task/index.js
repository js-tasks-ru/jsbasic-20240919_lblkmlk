import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.prevCategory = null;
    this.render();
    this.initArrows();
    this.selectCategory();
  }

  render() {
    this.elem = createElement(`<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`);
      
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    this.categories.forEach((category) => {
      ribbonInner.insertAdjacentHTML('beforeend', `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`);
    })
  }

  initArrows() {
    const leftArrow = this.elem.querySelector('.ribbon__arrow_left');
    const rightArrow = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    leftArrow.onclick = () => ribbonInner.scrollBy(-350, 0);
    rightArrow.onclick = () => ribbonInner.scrollBy(350, 0);
    ribbonInner.addEventListener('scroll', () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollRight < 1) {
        rightArrow.classList.remove('ribbon__arrow_visible');
      }
      else {
        rightArrow.classList.add('ribbon__arrow_visible');
      }

      if (scrollLeft < 1) {
        leftArrow.classList.remove('ribbon__arrow_visible');
      }
      else {
        leftArrow.classList.add('ribbon__arrow_visible');
      }
    });
  }

  selectCategory() {
    this.elem.addEventListener('click', (event) => {
      if (event.target.nodeName !== 'A') {
        return;
      }

      event.preventDefault();
      event.target.classList.add('ribbon__item_active');

      if (this.prevCategory) {
        this.prevCategory.classList.remove('ribbon__item_active');
      }

      this.prevCategory = event.target;

      const ce = new CustomEvent('ribbon-select', {
        detail: event.target.attributes['data-id'].nodeValue,
        bubbles: true,
      });

      this.elem.dispatchEvent(ce);
    });
  }

}
