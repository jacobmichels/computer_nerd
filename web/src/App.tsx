import {
  Box,
  ChakraProvider,
  Grid,
  HStack,
  theme,
  VStack,
} from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { BreachProtocolGrid } from "./BreachProtocol/BreachProtocolGrid";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { SettingsButton } from "./SettingsButton";
import { Title } from "./Title";

export const App = () => (
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <HStack justifySelf="flex-end" mb="10vh">
            <ColorModeSwitcher />
            <SettingsButton />
          </HStack>

          <VStack spacing={8}>
            <Title />
            <BreachProtocolGrid rows={5} cols={5} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  </RecoilRoot>
);
