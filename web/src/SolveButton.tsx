import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { SolveService } from "./gen/proto/v1/nerd_connectweb";
import {
  createPromiseClient,
  createConnectTransport,
} from "@bufbuild/connect-web";
import { SolveRequest } from "./gen/proto/v1/nerd_pb";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  bufferSizeState,
  colsCount,
  compressedGrid,
  desiredStringState,
  GridCell,
  gridState,
  rowsCount,
  statusMessage,
} from "./App";

const transport = createConnectTransport({
  baseUrl: "https://computer-nerd-gwksazschq-ue.a.run.app/",
  useBinaryFormat: true,
});
const client = createPromiseClient(SolveService, transport);

export const SolveButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const bufferSize = useRecoilValue(bufferSizeState);
  const cols = useRecoilValue(colsCount);
  const rows = useRecoilValue(rowsCount);
  const desiredString: string[] = useRecoilValue(desiredStringState);
  const grid: string[] = useRecoilValue(compressedGrid);
  const [fullGrid, setFullGrid] = useRecoilState(gridState);
  const setStatus = useSetRecoilState(statusMessage);

  const submit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    });
    let response = await client.solve(
      new SolveRequest({
        bufferSize: bufferSize,
        cols: cols,
        rows: rows,
        desiredString: desiredString,
        grid: grid,
      })
    );
    setIsLoading(false);

    console.log(response);

    if (response.possible) {
      setStatus("Solution found!");
      let gridCopy: GridCell[][] = JSON.parse(JSON.stringify(fullGrid));
      for (const row of gridCopy) {
        for (const cell of row) {
          cell.isHighlighted = false;
        }
      }
      for (const { x, y } of response.solutionIndexes) {
        gridCopy[y][x].isHighlighted = true;
      }
      setFullGrid(gridCopy);
    } else {
      setStatus("No solution found.");
    }
  };

  return (
    <Button isLoading={isLoading} onClick={submit}>
      Solve
    </Button>
  );
};
