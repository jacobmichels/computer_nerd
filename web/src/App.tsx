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
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { SettingsButton } from "./SettingsButton";
import { SolveButton } from "./SolveButton";
import { SolveParameters } from "./SolveParameters";
import { Title } from "./Title";

export const gridState = atom({
  key: "gridState",
  default: Array(4).fill(Array(4).fill("BD")),
});

export const compressedGrid = selector({
  key: "compressedGrid",
  get: ({ get }) => {
    let grid = get(gridState);
    let compressedGrid: string[] = [];
    for (let row of grid) {
      for (let col of row) {
        compressedGrid.push(col);
      }
    }
    return compressedGrid;
  },
});

export const desiredStringState = atom({
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
    return get(gridState)[0].length;
  },
});

export const App = () => (
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <HStack justifySelf="flex-end">
            <ColorModeSwitcher />
            <SettingsButton />
          </HStack>

          <VStack spacing={8}>
            <Title />
            <BreachProtocolGrid />
            <SolveParameters />
            <SolveButton />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  </RecoilRoot>
);
