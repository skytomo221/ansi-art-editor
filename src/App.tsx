import React from "react";
import { LayerList } from "./components/LayerList";
import { RootLayerProvider } from "./contexts/rootLayerContext";
import { ChildrenLayerProvider } from "./contexts/childrenLayerContext";
import { Screen } from "./components/Screen";

export const App = () => (
  <div className="app-root bp5-dark">
    <RootLayerProvider>
      <ChildrenLayerProvider>
        <div>Tool Box</div>
        <Screen />
        <LayerList />
      </ChildrenLayerProvider>
    </RootLayerProvider>
  </div>
);
