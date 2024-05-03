import React, { FocusEvent } from "react";

import { Button, Card, Collapse, Text } from "@blueprintjs/core";
import { LayerName } from "./LayerName";
import {
  useChildrenLayerDispatch,
  useChildrenLayerStore,
} from "../contexts/childrenLayerContext";
import { TextLayerProperty } from "./TextLayerProperty";
import { ImageLayerProperty } from "./ImageLayerProperty";

type Props = {
  index: number;
};

export const LayerListItem = ({ index }: Props): JSX.Element => {
  const store = useChildrenLayerStore();
  const dispatch = useChildrenLayerDispatch();
  const layer = store[index];
  const { id, isOpen, type } = layer;

  function setIsOpen(isOpen: boolean) {
    dispatch({
      type: `${isOpen ? "OPEN" : "CLOSE"}_LAYER`,
      id,
    });
  }

  function changeLayerName(e: FocusEvent<HTMLInputElement>) {
    layer.name = e.target.value;
    dispatch({
      type: "UPDATE_LAYER",
      id,
      layer,
    });
  }

  function property() {
    switch (type) {
      case "text":
        return <TextLayerProperty index={index} layer={layer} />;
      case "image":
        return <ImageLayerProperty index={index} layer={layer} />;
      case "compound":
        return <Card>{layer.name}</Card>;
      default:
        return <Card>never</Card>;
    }
  }

  return (
    <Card>
      <div style={{ display: "flex" }}>
        <LayerName name={layer.name} onBlur={changeLayerName} />
        <Button
          className="app-layer-collapse"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          icon={"settings"}
        ></Button>
      </div>
      <Collapse isOpen={isOpen}>{property()}</Collapse>
    </Card>
  );
};
