import { HStack } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { colsCount, rowsCount } from "../App";
import { GridParameters } from "../GridParameters";
import { BreachProtocolRow } from "./BreachProtocolRow";

export const BreachProtocolGrid: React.FC = () => {
  let rows = useRecoilValue(rowsCount);
  let cols = useRecoilValue(colsCount);

  return (
    <>
      <GridParameters />
      {[...Array(rows)].map((_, i) => (
        <HStack key={i}>
          <BreachProtocolRow row={i} cols={cols} />
        </HStack>
      ))}
    </>
  );
};
