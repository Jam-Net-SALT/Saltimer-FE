import React from "react";
import ReactDOM from "react-dom";
import { Provider as StateProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./Pages/App";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider store={store}>
        <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
