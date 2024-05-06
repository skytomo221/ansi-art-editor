import { Button, Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";
import React from "react";
import { useChildrenLayerDispatch } from "../contexts/childrenLayerContext";

type Props = {
  layerId: number;
};

const DeleteLayer = ({ layerId }: Props): JSX.Element => {
  const dispatch = useChildrenLayerDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleDelete = () => {
    dispatch({ type: "DELETE_LAYER", id: layerId });
  };

  return (
    <>
      <Button intent="danger" onClick={() => setIsOpen(true)}>
        レイヤーを削除する
      </Button>
      <Dialog
        title="Informational dialog"
        icon="warning-sign"
        isOpen={isOpen}
        canEscapeKeyClose
        canOutsideClickClose
      >
        <DialogBody>本当にレイヤーを削除しますか？</DialogBody>
        <DialogFooter
          actions={
            <>
              <Button intent="danger" text="削除する" onClick={handleDelete} />
              <Button
                intent="primary"
                text="キャンセル"
                onClick={() => setIsOpen(false)}
              />
            </>
          }
        />
      </Dialog>
    </>
  );
};

export default DeleteLayer;
