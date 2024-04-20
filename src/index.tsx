import React from "react";
import { createRoot } from "react-dom/client";

const App = () => <div>Hello, React!</div>;

const container = document.getElementById("root");
if (container === null)
  throw new Error("No root element found in the document");
const root = createRoot(container);
root.render(<App />);

export default function sum(a: number, b: number) {
  return a + b;
}