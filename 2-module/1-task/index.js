function sumSalary(salaries) {
  let result = 0;

  for (let key in salaries) {
    if (
        typeof salaries[key] === 'number' &&
       salaries[key] !== Infinity &&
       salaries[key] !== -Infinity &&
       !isNaN(salaries[key])
      ) {
        result += salaries[key];
      }
  }

  return result;
}
