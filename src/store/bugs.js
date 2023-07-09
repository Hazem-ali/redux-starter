import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";


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

// export const getUnresolvedBugs = (state) => {
//   return state.entities.bugs.filter((bug) => !bug.resolved);
// };


export const getUnresolvedBugs =createSelector(
  state => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
)