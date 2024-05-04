import React, { FocusEvent } from "react";

import { Button, Card, Collapse } from "@blueprintjs/core";
import { LayerName } from "./LayerName";
import {
  useChildrenLayerDispatch,
} from "../contexts/childrenLayerContext";
import { TextLayerProperty } from "./TextLayerProperty";
import { ImageLayerProperty } from "./ImageLayerProperty";
import { Layer } from "../model/layer";

type Props = {
  layer: Layer;
};

export const LayerListItem = ({ layer }: Props): JSX.Element => {
  const dispatch = useChildrenLayerDispatch();
  const { id, isOpen, type } = layer;

  function setIsOpen(isOpen: boolean) {
    dispatch({
      type: `${isOpen ? "OPEN" : "CLOSE"}_LAYER`,
      id,
    });
  }

  function changeLayerName(e: FocusEvent<HTMLInputElement>) {
    const name = e.target.value;
    dispatch({
      type: "RENAME_LAYER",
      id,
      name,
    });
  }

  function property() {
    switch (type) {
      case "text":
        return <TextLayerProperty layer={layer} />;
      case "image":
        return <ImageLayerProperty layer={layer} />;
      case "compound":
        return <Card>{layer.name}</Card>;
      default:
        return <Card>never</Card>;
    }
  }

  return (
    <Card style={{ }}>
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
