import React, { FocusEvent } from "react";

type Props = {
  name: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

export const LayerName = ({ name, onBlur }: Props): JSX.Element => {
  const [text, setText] = React.useState(name);

  return (
    <input
      type="text"
      className="app-layer-name"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
      onBlur={onBlur}
      required
    />
  );
};
