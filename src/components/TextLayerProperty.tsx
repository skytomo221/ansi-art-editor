import React, { FocusEvent } from "react";

import { FormGroup, NumericInput, TextArea } from "@blueprintjs/core";
import { TextLayer } from "../model/textLayer";
import { useLayersDispatch } from "../contexts/layersContext";

type Props = {
  index: number;
  layer: TextLayer;
};

export const TextLayerProperty = ({ index, layer }: Props): JSX.Element => {
  const [text, setText] = React.useState(layer.text);
  const [x, setX] = React.useState(layer.position.x);
  const [y, setY] = React.useState(layer.position.y);
  const dispatch = useLayersDispatch();

  function changeText() {
    layer.text = text;
    dispatch({
      type: "UPDATE_LAYER",
      index,
      layer,
    });
  }

  function changePosition() {
    layer.position = { x, y };
    dispatch({
      type: "UPDATE_LAYER",
      index,
      layer,
    });
  }

  return (
    <div>
      <FormGroup style={{ display: "flex" }} label="Position">
        <FormGroup label="X">
          <NumericInput
            value={x}
            onValueChange={(n) => {
              setX(n);
            }}
            onBlur={changePosition}
          />
        </FormGroup>
        <FormGroup label="Y">
          <NumericInput
            value={y}
            onValueChange={(n) => {
              setY(n);
            }}
            onBlur={changePosition}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup label="Text">
        <TextArea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onBlur={changeText}
        ></TextArea>
      </FormGroup>{" "}
    </div>
  );
};
