import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";

injectTapEventPlugin();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
