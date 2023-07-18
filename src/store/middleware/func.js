const func =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      action(getState, dispatch);
    } else next(action);
  };
export default func;
