import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "@fontsource/roboto";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/kukkiva-kotini">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
