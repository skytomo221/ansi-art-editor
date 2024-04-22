import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { App } from "./App";
import "./style.scss";

const container = document.getElementById("root");
if (container === null)
  throw new Error("No root element found in the document");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
