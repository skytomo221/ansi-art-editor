import React from "react";
import { LayerList } from "./components/LayerList";
import { RootLayerProvider } from "./contexts/rootLayerContext";
import { ChildrenLayerProvider } from "./contexts/childrenLayerContext";
import { Screen } from "./components/Screen";
import { BlueprintProvider } from "@blueprintjs/core";

export const App = () => (
  <div className="app-root bp5-dark">
    <BlueprintProvider>
      <RootLayerProvider>
        <ChildrenLayerProvider>
          <div>Tool Box</div>
          <Screen />
          <LayerList />
        </ChildrenLayerProvider>
      </RootLayerProvider>
    </BlueprintProvider>
  </div>
);
