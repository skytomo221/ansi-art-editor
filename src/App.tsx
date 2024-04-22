import React from "react";
import { LayerList } from "./components/LayerList";
import { LayersProvider } from "./contexts/layersContext";
import { Screen } from "./components/Screen";

export const App = () => (
  <div className="app-root bp5-dark">
    <LayersProvider>
      <div>Tool Box</div>
      <Screen />
      <LayerList />
    </LayersProvider>
  </div>
);
