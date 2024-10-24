import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.init();
    this.handleKeydown = this.onKeyDown.bind(this);
  }

  init() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
  
            <h3 class="modal__title"></h3>
          </div>
  
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this.elem.querySelector('.modal__close').onclick = () => this.close();
  }

  onKeyDown(e) {
    if (e.code === 'Escape') {
      this.close();
    }
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.handleKeydown);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.handleKeydown);
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').innerHTML = title;
  }

  setBody(node) {
    this.elem.querySelector('.modal__body').innerHTML = node.outerHTML;
  }
}
