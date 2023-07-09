import { bugAdded, bugRemoved, bugResolved } from './actions'
import store from './store'

const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState());
});


store.dispatch(bugAdded("Bug1"));


store.dispatch(bugResolved(1));
console.log(store.getState());