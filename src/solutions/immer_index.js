import { produce } from 'immer';

let book = {
    title: "Harry Potter",
    address: { name: "hazem", age: { before: "xyz", after: "abc" } },
  };
function publish(book) {
    return produce(book, draftBook => {
        draftBook.isPublished = true;
        draftBook.address.age.before = 'Moftish'
    }); 
}




const updated = publish(book);

console.log(book);
console.log(updated);