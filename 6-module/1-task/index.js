/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;

    this.render();
  }

  render() {
    this.elem = document.createElement('table');
    this.elem.innerHTML = '<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>';
    this.elem.insertAdjacentHTML('beforeend', this.rows.reduce((str, row, i) => str + `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td><td><button onclick="this.parentNode.parentNode.remove()">X</button></td></tr>`, ''));
  }
}
