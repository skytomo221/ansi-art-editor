import React, { FocusEvent } from "react";

import { FormGroup, NumericInput, TextArea } from "@blueprintjs/core";
import { useChildrenLayerDispatch } from "../contexts/childrenLayerContext";
import { TextLayer } from "../model/layer";

type Props = {
  layer: TextLayer;
};

export const TextLayerProperty = ({ layer }: Props): JSX.Element => {
  const [text, setText] = React.useState(layer.text);
  const [x, setX] = React.useState(layer.offset.x);
  const [y, setY] = React.useState(layer.offset.y);
  const { id } = layer;
  const dispatch = useChildrenLayerDispatch();

  function changeText() {
    layer.text = text;
    dispatch({
      type: "UPDATE_LAYER",
      id,
      layer,
    });
  }

  function changePosition() {
    layer.offset = { x, y };
    dispatch({
      type: "UPDATE_LAYER",
      id,
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
            fill={true}
          />
        </FormGroup>
        <FormGroup label="Y">
          <NumericInput
            value={y}
            onValueChange={(n) => {
              setY(n);
            }}
            onBlur={changePosition}
            fill={true}
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
          fill={true}
        ></TextArea>
      </FormGroup>
    </div>
  );
};
