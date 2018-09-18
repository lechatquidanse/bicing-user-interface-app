import React from "react";
import { Provider } from "react-redux";

import store from "./../../application/state/store";
import Home from "./Home";

export default () =>
  <Provider store={store}>
    <Home />
  </Provider>;