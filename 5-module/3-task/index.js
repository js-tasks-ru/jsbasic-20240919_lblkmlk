function initCarousel() {
  const leftArrow = document.getElementsByClassName('carousel__arrow_left')[0];
  const rightArrow = document.getElementsByClassName('carousel__arrow_right')[0];
  const tape = document.getElementsByClassName('carousel__inner')[0];
  const updateArrows = () => {
    leftArrow.style.display = '';
    rightArrow.style.display = '';

    if (posIndex === 0) {
      leftArrow.style.display = 'none';
    }
    else if (posIndex === 3) {
      rightArrow.style.display = 'none';
    }
  }

  let posIndex = 0;

  updateArrows();

  leftArrow.onclick = () => {
    posIndex--;
    tape.style.transform = `translateX(${posIndex * -tape.offsetWidth}px)`;
    updateArrows();
  };
  rightArrow.onclick = () => {
    posIndex++;
    tape.style.transform = `translateX(${posIndex * -tape.offsetWidth}px)`;
    updateArrows();
  };



}
