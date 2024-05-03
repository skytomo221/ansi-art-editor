import makeStore from "./makeContext";

type State = {};

type Action = never;

const initialState: State = {};

const reducer = (state: State, _: Action): State => {
  return state;
};

export const [RootLayerProvider, useRootLayerStore, useRootLayerDispatch] =
  makeStore(reducer, initialState);
