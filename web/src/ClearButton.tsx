import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import {
  bufferSizeState,
  defaultStatusMessage,
  desiredStringState,
  gridState,
  statusMessage,
} from "./App";

export const ClearButton = () => {
  const setStatus = useSetRecoilState(statusMessage);
  const setGrid = useSetRecoilState(gridState);
  const setDesiredString = useSetRecoilState(desiredStringState);
  const setBufferSize = useSetRecoilState(bufferSizeState);

  const reset = () => {
    setBufferSize(4);
    setDesiredString(["BD", "BD", "BD", "BD"]);
    setGrid(
      Array(4).fill(Array(4).fill({ value: "BD", isHighlighted: false }))
    );
    setStatus(defaultStatusMessage);
  };

  return <Button onClick={reset}>Reset</Button>;
};
