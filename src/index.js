import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugWiped,
  getUnresolvedBugs,
} from "./store/bugs";
// import * as actions from "./store/projects";

const store = configureStore();

//* subscribe is a function that contains a callback function that is called whenever state changed
const unsubscribe = store.subscribe(() => {
  console.log("Store Changed", store.getState());
  return;
});

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));




// store.dispatch(actions.projectAdded({ name: "ProjectX" }));
// store.dispatch(actions.projectRemoved({ id: 1 }));
const unresolvedBugs = getUnresolvedBugs(store.getState())
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));
const unresolvedBugs2 = getUnresolvedBugs(store.getState())
console.log(store.getState());

console.log(unresolvedBugs === unresolvedBugs2)

