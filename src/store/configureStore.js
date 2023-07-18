import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";
import api from "./middleware/api";
import thunk from "redux-thunk";

export default function () {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware => [thunk,  ...getDefaultMiddleware(), api] ,
    // middleware: [...getDefaultMiddleware(), logger, toast],
  });
}