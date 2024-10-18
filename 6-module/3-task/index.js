import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.maxIndex = slides.length - 1;
    this.render();
    this.initCarousel();
    this.addButtonEvent();
  }

  render() {
    this.elem = createElement(`
       <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">
    </div>
  </div>
      `);

      this.carouselInner = this.elem.querySelector('.carousel__inner');

      const slidesStr = this.slides.reduce((str, slide) => {
        return str + `
        <div class="carousel__slide" data-id="penang-shrimp">
  <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${slide.price.toFixed(2)}</span>
    <div class="carousel__title">${slide.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>
        `;
      }, '');
    
      this.carouselInner.innerHTML = slidesStr;
  }

  initCarousel() {
    this.leftArrow = this.elem.querySelector('.carousel__arrow_left');
    this.rightArrow = this.elem.querySelector('.carousel__arrow_right');
  
    this.posIndex = 0;
  
    this.updateArrows();
  
    this.leftArrow.onclick = () => {
      this.posIndex--;
      this.carouselInner.style.transform = `translateX(${this.posIndex * -this.carouselInner.offsetWidth}px)`;
      this.updateArrows();
    };
    this.rightArrow.onclick = () => {
      this.posIndex++;
      this.carouselInner.style.transform = `translateX(${this.posIndex * -this.carouselInner.offsetWidth}px)`;
      this.updateArrows();
    };
  }
  
  updateArrows() {
    this.leftArrow.style.display = '';
    this.rightArrow.style.display = '';

    if (this.posIndex === 0) {
      this.leftArrow.style.display = 'none';
    }
    else if (this.posIndex === this.maxIndex) {
      this.rightArrow.style.display = 'none';
    }
  }

  addButtonEvent() {
    const plusButtons = this.elem.querySelectorAll('.carousel__button'); 

    plusButtons.forEach((btn, i) => {
      btn.addEventListener('click', ev => {
        const ce = new CustomEvent('product-add', {
          detail: this.slides[i].id,
          bubbles: true,
        });
  
        this.elem.dispatchEvent(ce);
      });
    });
  }
}



