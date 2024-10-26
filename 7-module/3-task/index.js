import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();
    this.setProgress(value);
    this.elem.onclick = this.onClick.bind(this);
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

  setProgress(value) {
    this.value = value;

    const progress = `${value / ((this.steps - 1) / 100)}%`;

    this.sliderValue.innerHTML = value;
    this.sliderThumb.style.left = progress;
    this.sliderProgress.style.width = progress;
    this.sliderSteps.childNodes.forEach((node, i) => {
      if (i === value) {
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
}
