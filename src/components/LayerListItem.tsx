import React, { FocusEvent } from "react";

import { Button, Card, Collapse } from "@blueprintjs/core";
import { LayerName } from "./LayerName";
import { useChildrenLayerDispatch } from "../contexts/childrenLayerContext";
import { TextLayerProperty } from "./TextLayerProperty";
import { ImageLayerProperty } from "./ImageLayerProperty";
import { Layer } from "../model/layer";
import { CompoundLayerProperty } from "./CompoundLayerProperty";
import { Draggable } from "@hello-pangea/dnd";
import { DraggableLayerListItem } from "./DraggableLayerListItem";

type Props = {
  layer: Layer;
  index: number;
};

export const LayerListItem = ({ layer, index }: Props): JSX.Element => {
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
        return <CompoundLayerProperty layer={layer} />;
      default:
        return <Card>never</Card>;
    }
  }

  return (
    <DraggableLayerListItem layerId={id} index={index}>
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
    </DraggableLayerListItem>
  );
};
