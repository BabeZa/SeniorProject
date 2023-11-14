import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import "./i18n";

ReactDOM.render(
  <Suspense fallback={<div>Loading</div>}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,

  document.getElementById("root")
);
