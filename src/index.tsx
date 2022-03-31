import React from "react";
import ReactDOM from "react-dom";
import { Provider as StateProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider store={store}>
        <Layout />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
