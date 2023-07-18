import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import actions from "./api";
import moment from "moment";
import { isMinutesPassed } from "../utils/time";

// ? Slice is the function that wraps createActions and createReducers at one function
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
      return bugs;
    },
    bugsReceived: (bugs, action) => {
      bugs.list.push(...action.payload);
      bugs.loading = false;
      bugs.lastFetch = Date.now();
      return bugs;
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
      return bugs;
    },
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugRemoved: (bugs, action) => {
      bugs.list = bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => {
        return bug.id === action.payload.id;
      });
      bugs.list[index].resolved = true;
      return bugs;
    },
    bugWiped: (bugs, action) => {
      console.log("at reducer");
      console.log(bugs);
      bugs = [{}];
      console.log(bugs);
      console.log("end reducer");
      return bugs;
    },
    bugAssigned: (bugs, action) => {
      const bugIndex = bugs.list.findIndex((bug) => {
        return bug.id === action.payload.id;
      });
      console.log(bugs.list[bugIndex])
      bugs.list[bugIndex].userId = action.payload.userId;
      return bugs;
    },
  },
});

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugWiped,
  bugAssigned,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// Custom Action Creators
const url = "/bugs";
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  if (isMinutesPassed(lastFetch, 10)) return;

  dispatch(
    actions.apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) => {
  return actions.apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });
};
export const resolveBug = (id) => {
  return actions.apiCallBegan({
    url: `${url}/${id}`,
    method: "patch",
    data: {resolved: true},
    onSuccess: bugResolved.type,
  });
};
export const assignBugToUser = (bugId, userId) => {
  return actions.apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data: {userId: userId},
    onSuccess: bugAssigned.type,
  });
};

// Selectors
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs, // key
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((bug) => bug.assignedTo === userId)
  );
