import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { SolveService } from "./gen/proto/v1/nerd_connectweb";
import {
  createPromiseClient,
  createConnectTransport,
} from "@bufbuild/connect-web";
import { SolveRequest } from "./gen/proto/v1/nerd_pb";
import { useRecoilValue } from "recoil";
import {
  bufferSizeState,
  colsCount,
  compressedGrid,
  desiredStringState,
  rowsCount,
} from "./App";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});
const client = createPromiseClient(SolveService, transport);

export const SolveButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const bufferSize = useRecoilValue(bufferSizeState);
  const cols = useRecoilValue(colsCount);
  const rows = useRecoilValue(rowsCount);
  const desiredString: string[] = useRecoilValue(desiredStringState);
  const grid: string[] = useRecoilValue(compressedGrid);

  const submit = async () => {
    // setIsLoading(true);
    let response = await client.solve(
      new SolveRequest({
        bufferSize: bufferSize,
        cols: cols,
        rows: rows,
        desiredString: desiredString,
        grid: grid,
      })
    );

    console.log(response);
  };

  return (
    <Button isLoading={isLoading} onClick={submit}>
      Solve
    </Button>
  );
};
