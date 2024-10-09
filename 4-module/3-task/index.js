function highlight(table) {

  for(let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[3].hasAttribute('data-available')) {
      let isAvailable = table.rows[i].cells[3].getAttribute('data-available');

      if (isAvailable === 'true') {
        table.rows[i].classList.add('available');
      }
      else {
        table.rows[i].classList.add('unavailable');
      }
    }
    else {
      table.rows[i].hidden = true;
    }

    if (table.rows[i].cells[2].innerHTML === 'm') {
      table.rows[i].classList.add('male');
    }
    else {
      table.rows[i].classList.add('female');
    }

    if (Number(table.rows[i].cells[1].innerHTML) < 18) {
      table.rows[i].style.textDecoration = 'line-through';
    }
  }
}
