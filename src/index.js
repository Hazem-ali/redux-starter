import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugWiped,
  bugAssigned,
  getUnresolvedBugs,
  getBugsByUser,
  loadBugs,
  addBug,
  resolveBug,
  assignBugToUser,
} from "./store/bugs";

const store = configureStore();

// store.dispatch(bugAdded({ description: "Bug 1" }));

// store.dispatch(
//   addBug({
//     description: "xyz123",
//   })
// );
store.dispatch(loadBugs());

setTimeout(() => {
  // store.dispatch(resolveBug(2))
  store.dispatch(assignBugToUser(2,600))
  
}, 2000);

// console.log(getBugsByUser(3)(store.getState()));
