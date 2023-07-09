import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

// ? Slice is the function that wraps createActions and createReducers at one function
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugRemoved: (state, action) => {
      state = state.filter((bug) => bug.id !== action.payload.id);
    },
    bugResolved: (state, action) => {
      const index = state.findIndex((bug) => {
        return bug.id === action.payload.id;
      });
      state[index].resolved = true;
      return state;
    },
    bugWiped: (state, action) => {
      console.log("at reducer");
      console.log(state);
      state = [{}];
      console.log(state);
      console.log("end reducer");
      return state;
    },
  },
});

export const { bugAdded, bugRemoved, bugResolved, bugWiped } = slice.actions;
export default slice.reducer;

// // * Action Creators

// /**
//  *? Action Creator module: Takes the argument and encapsulate it in redux action form (type, payload ... etc)
//  */

// export const bugAdded = createAction("bugAdded");
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");
// export const bugWiped = createAction("bugWiped");

// // * Reducer

// export default createReducer([], {
//   [bugAdded.type]: (state, action) => {
//     state.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },
//   [bugRemoved.type]: (state, action) => {
//     state = state.filter((bug) => bug.id !== action.payload.id);
//   },
//   [bugResolved.type]: (state, action) => {
//     const index = state.findIndex((bug) => {
//       return bug.id === action.payload.id;
//     });
//     state[index].resolved = true;
//     return state;
//   },
//   [bugWiped.type]: (state, action) => {
//     console.log("at reducer");
//     console.log(state);
//     state = [{}];
//     console.log(state);
//     console.log("end reducer");
//     return state;
//   },
// });
