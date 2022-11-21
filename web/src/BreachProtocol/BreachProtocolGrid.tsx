import { HStack } from "@chakra-ui/react";
import React from "react";
import { BreachProtocolRow } from "./BreachProtocolRow";

interface BreachProtocolProps {
  rows: number;
  cols: number;
}

export const BreachProtocolGrid: React.FC<BreachProtocolProps> = ({
  rows,
  cols,
}) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <HStack key={i}>
          <BreachProtocolRow cols={cols} />
        </HStack>
      ))}
    </>
  );
};
