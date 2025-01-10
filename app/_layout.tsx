import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import AppNavigation from "./(tabs)";

export default function Layout() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
