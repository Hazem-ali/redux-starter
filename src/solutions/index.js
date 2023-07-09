// import { update } from 'lodash';
import { compose, pipe } from "lodash/fp";

// function sayHello() {
//     return function() {
//         return "Hello WOrld";
//     }
// }

let input = "   JavaScript   ";

const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
const toLowerCase = (str) => str.toLowerCase();

const result = wrapInDiv(toLowerCase(trim(input)));
// const transform = compose(wrapInDiv, toLowerCase, trim);
const transform = pipe(trim, toLowerCase, wrap("span"));
console.log("Transform");
console.log(transform(input));

// Shallow Copy and Deep Copy

const person = {
  name: "John",
  address: {
    country: "USA",
    city: "San Francisco",
  },
};
// const updated = Object.assign({}, person, { name: "Bob", age: 30});
const updated = {
  ...person,

  name: "Bob",
  age: 30,
};
updated.address.city = "New York";
console.log(person);

// Adding

const numbers = [1, 2, 3];

const index = numbers.indexOf(2);

const added = [...numbers.slice(0, index), 4, ...numbers.slice(index)];
console.log(added);

// removing

const removed = numbers.filter((n) => n !== 2);
console.log(removed);

//updating

const updated = numbers.map((n) => (n === 2 ? 20 : n));

console.log(updated);
