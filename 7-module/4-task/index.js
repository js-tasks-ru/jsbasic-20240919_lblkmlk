import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.handlePointermove = this.onPointermove.bind(this);

    this.render();
    this.setProgress(value);
    this.elem.onclick = this.onClick.bind(this);
    this.sliderThumb.ondragstart = () => false;
    this.sliderThumb.onpointerdown = this.onPointerdown.bind(this);
  }

  render() {
    this.elem = createElement(`
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">2</span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: 50%;"></div>

        <!--Шаги слайдера-->
        <div class="slider__steps"></div>
      </div>
    `);

    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderProgress = this.elem.querySelector('.slider__progress');
    this.sliderSteps = this.elem.querySelector('.slider__steps');

    for (let i = 0; i < this.steps; i++) {
        this.sliderSteps.innerHTML += '<span></span>';
    }
  }

  setProgress(value, isMoving = false) {
    this.value = value;

    const progress = `${value / ((this.steps - 1) / 100)}%`;

    this.sliderValue.innerHTML = isMoving ? Math.round(value) : value;
    this.sliderThumb.style.left = progress;
    this.sliderProgress.style.width = progress;
    this.sliderSteps.childNodes.forEach((node, i) => {
      if (i === Math.round(value)) {
        node.classList.add('slider__step-active');
      }
      else {
        node.classList.remove('slider__step-active');
      }
    });
  }

  onClick(event) {
    this.value = Math.round(((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth) * (this.steps - 1));

    this.setProgress(this.value);

    const ce = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });

    this.elem.dispatchEvent(ce);
  }

  onPointerdown(event) {
    document.addEventListener('pointermove', this.handlePointermove);

    this.elem.classList.add('slider_dragging');

    document.onpointerup = () => {
      document.removeEventListener('pointermove', this.handlePointermove);
      document.onpointerup = null;

      this.elem.classList.remove('slider_dragging');

      this.setProgress(Math.round(this.value));

      const ce = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      });

      this.elem.dispatchEvent(ce);
    }
  }

  onPointermove(event) {
    let leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    leftRelative = leftRelative < 0 ? 0 : leftRelative > 1 ? 1 : leftRelative;

    const value = leftRelative * (this.steps - 1);

    this.setProgress(value, true);
  }
}
