function toggleText() {
  document.getElementsByClassName('toggle-text-button')[0].onclick = () => {
    document.getElementById('text').hidden = !document.getElementById('text').hidden;
  };
}
