import { Map } from "immutable";

let book = Map({
  title: "Harry Potter",
  address: { name: "hazem", age: { before: "xyz", after: "abc" } },
});

function publish(book) {
  return book.set("isPublished", true);
}

book = publish(book);

let book2 = book.toJS();
book2.address.name = "mofty";
book2.address.age.before = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
console.log(book.toJS());
console.log(book2);
