import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugWiped,
  bugAssigned,
  getUnresolvedBugs,
} from "./store/bugs";

import { userAdded } from "./store/users";

// import * as actions from "./store/projects";

const store = configureStore();

//* subscribe is a function that contains a callback function that is called whenever state changed
const unsubscribe = store.subscribe(() => {
  console.log("Store Changed", store.getState());
  return;
});

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));

store.dispatch(userAdded({ name: "Hazooom" }));

store.dispatch(bugAssigned({ bugId: 1, userId: 1 }));

console.log(store.getState());
