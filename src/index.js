import configureStore from "./store/configureStore";
// import * as actions from "./store/bugs";
import * as actions from "./store/projects";

const store = configureStore();

//* subscribe is a function that contains a callback function that is called whenever state changed
const unsubscribe = store.subscribe(() => {
  console.log("Store Changed", store.getState());
  return;
});

// store.dispatch(actions.bugAdded({ description: "Bug 1" }));
// store.dispatch(actions.bugResolved({ id: 1 }));
// store.dispatch(actions.bugWiped({ id: 1 }));

store.dispatch(actions.projectAdded({ name: "ProjectX" }));
store.dispatch(actions.projectRemoved({ id: 1 }));

console.log(store.getState());
