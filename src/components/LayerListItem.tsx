import React, { FocusEvent } from "react";

import { Button, Card, Collapse, Text } from "@blueprintjs/core";
import { Layer } from "../model/layer";
import { LayerName } from "./LayerName";
import { useLayersDispatch, useLayersStore } from "../contexts/layersContext";
import { TextLayerProperty } from "./TextLayerProperty";
import { TextLayer } from "../model/textLayer";
import { ImageLayerProperty } from "./ImageLayerProperty";
import { ImageLayer } from "../model/imageLayer";

type Props = {
  index: number;
  layer: Layer;
};

export const LayerListItem = ({ index, layer }: Props): JSX.Element => {
  const store = useLayersStore();
  const dispatch = useLayersDispatch();
  const isOpen = store[index].isOpen;

  function setIsOpen(isOpen: boolean) {
    dispatch({
      type: `${isOpen ? "OPEN" : "CLOSE"}_LAYER`,
      index,
    });
  }

  // const [isOpen, setIsOpen] = React.useState(false);

  function changeLayerName(e: FocusEvent<HTMLInputElement>) {
    layer.name = e.target.value;
    dispatch({
      type: "UPDATE_LAYER",
      index,
      layer,
    });
  }

  function property() {
    if (layer instanceof TextLayer) {
      return <TextLayerProperty index={index} layer={layer} />;
    } else if (layer instanceof ImageLayer) {
      return <ImageLayerProperty index={index} layer={layer} />;
    } else {
      return <Card>{layer.name}</Card>;
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
