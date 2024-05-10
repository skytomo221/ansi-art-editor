import makeStore from "./makeContext";

export const colorModes = [
  "3-bit",
  "3-bit (bright)",
  "4-bit",
  "8-bit",
  "24-bit",
];
export type ColorMode = (typeof colorModes)[number];

type State = {
  colorMode: ColorMode;
};

type Action = {
  type: "UPDATE_COLOR_MODE";
  colorMode: ColorMode;
};

const initialState: State = { colorMode: "24-bit" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_COLOR_MODE":
      return { ...state, colorMode: action.colorMode };
  }
};

export const [RootLayerProvider, useRootLayerStore, useRootLayerDispatch] =
  makeStore(reducer, initialState);
