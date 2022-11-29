import {
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { colsCount, GridCell, gridState, rowsCount } from "./App";

export const GridParameters: React.FC = () => {
  const [, gridSetter] = useRecoilState(gridState);
  const cols = useRecoilValue(colsCount);
  const rows = useRecoilValue(rowsCount);

  return (
    <HStack>
      <FormControl width={"15vh"}>
        <FormLabel>Rows</FormLabel>
        <NumberInput
          max={10}
          min={3}
          value={rows}
          onChange={(value) => {
            gridSetter((oldGrid) => {
              let newGrid: GridCell[][] = JSON.parse(JSON.stringify(oldGrid));
              if (newGrid.length < parseInt(value)) {
                for (let i = newGrid.length; i < parseInt(value); i++) {
                  newGrid.push(
                    Array(cols).fill({ value: "BD", isHighlighted: false })
                  );
                }
              } else if (newGrid.length > parseInt(value)) {
                newGrid = newGrid.slice(0, parseInt(value));
              }
              return newGrid;
            });
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl width={"15vh"}>
        <FormLabel>Columns</FormLabel>
        <NumberInput
          max={10}
          min={3}
          value={cols}
          onChange={(value) => {
            gridSetter((oldGrid) => {
              let newGrid: GridCell[][] = JSON.parse(JSON.stringify(oldGrid));
              for (let i = 0; i < newGrid.length; i++) {
                if (newGrid[i].length < parseInt(value)) {
                  for (let j = newGrid[i].length; j < parseInt(value); j++) {
                    newGrid[i].push({ value: "BD", isHighlighted: false });
                  }
                } else if (newGrid[i].length > parseInt(value)) {
                  newGrid[i] = newGrid[i].slice(0, parseInt(value));
                }
              }
              return newGrid;
            });
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </HStack>
  );
};
