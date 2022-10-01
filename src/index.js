import React, { createContext } from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import App from "./App";
import RootStore from "./store";
//TODO why we need provider?

const store = RootStore.create({});
export const StoreContext = createContext(store);
ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);
