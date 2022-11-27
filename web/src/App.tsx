import {
  Box,
  ChakraProvider,
  Grid,
  HStack,
  theme,
  VStack,
} from "@chakra-ui/react";
import { atom, RecoilRoot, selector } from "recoil";
import { BreachProtocolGrid } from "./BreachProtocol/BreachProtocolGrid";
import { ClearButton } from "./ClearButton";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { SolveButton } from "./SolveButton";
import { SolveParameters } from "./SolveParameters";
import { StatusText } from "./StatusText";
import { Title } from "./Title";

export interface GridCell {
  value: string;
  isHighlighted: boolean;
}
export const gridState = atom({
  key: "gridState",
  default: Array(4).fill(Array(4).fill({ value: "BD", isHighlighted: false })),
});

export const compressedGrid = selector({
  key: "compressedGrid",
  get: ({ get }) => {
    let grid: GridCell[][] = get(gridState);
    let compressedGrid: string[] = [];
    for (let row of grid) {
      for (let col of row) {
        compressedGrid.push(col.value);
      }
    }
    return compressedGrid;
  },
});

export const desiredStringState = atom<string[]>({
  key: "desiredStringState",
  default: Array(4).fill("BD"),
});

export const bufferSizeState = atom({
  key: "bufferSizeState",
  default: 4,
});

export const rowsCount = selector({
  key: "rowsCount",
  get: ({ get }) => {
    return get(gridState).length;
  },
});

export const colsCount = selector({
  key: "colsCount",
  get: ({ get }) => {
    let len: number = get(gridState)[0].length;
    return len;
  },
});

export const defaultStatusMessage =
  "Click solve to attempt to find the desired pattern in the grid.";

export const statusMessage = atom({
  key: "statusMessage",
  default: defaultStatusMessage,
});

export const App = () => (
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <HStack justifySelf="flex-end">
            <ColorModeSwitcher />
          </HStack>

          <VStack spacing={8}>
            <Title />
            <StatusText />
            <BreachProtocolGrid />
            <SolveParameters />
            <HStack>
              <SolveButton />
              <ClearButton />
            </HStack>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  </RecoilRoot>
);
