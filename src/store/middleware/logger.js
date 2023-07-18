const logger = (store) => (next) => (action) => {
  console.log("Logger");
  return next(action);
};
export default logger;
