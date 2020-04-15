var faker = require('faker');

var db = { employees: [] };

for (var i=1; i<=1000; i++) {
  db.employees.push({
    id: i,
    first_name: faker.name.firstName(),
    last_name:faker.name.lastName(),
    gender:faker.random.arrayElement(['male','female']),
    contact:faker.random.number(1111111,9999999999)
  });
}

console.log(JSON.stringify(db));
