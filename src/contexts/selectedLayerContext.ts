import makeStore from "./makeContext";

type State = number;

type Action = { type: "SELECT_LAYER"; index: number };

const initialState: State = -1;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SELECT_LAYER":
      return action.index;
    default:
      return state;
  }
};

const [SelectedLayerProvider, useSelectedLayerStore, useSelectedLayerDispatch] =
  makeStore(reducer, initialState);

export {
  SelectedLayerProvider,
  useSelectedLayerStore,
  useSelectedLayerDispatch,
};
