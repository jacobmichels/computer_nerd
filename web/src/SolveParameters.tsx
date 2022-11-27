import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { bufferSizeState, desiredStringState } from "./App";
import { BreachProtocolDesiredSelect } from "./BreachProtocol/BreachProtocolDesiredSelect";

export const SolveParameters = () => {
  let [bufferSize, setBufferSize] = useRecoilState(bufferSizeState);
  const [, setDesiredStringState] = useRecoilState(desiredStringState);

  return (
    <>
      <Box>
        <FormControl mb={"3vh"}>
          <FormLabel>Buffer size</FormLabel>
          <NumberInput
            max={10}
            min={1}
            value={bufferSize}
            onChange={(value) => {
              setBufferSize(parseInt(value));
              setDesiredStringState((oldDesired) => {
                let newDesired: string[] = JSON.parse(
                  JSON.stringify(oldDesired)
                );
                if (newDesired.length < parseInt(value)) {
                  for (let i = newDesired.length; i < parseInt(value); i++) {
                    newDesired.push("BD");
                  }
                } else if (newDesired.length > parseInt(value)) {
                  newDesired = newDesired.slice(0, parseInt(value));
                }
                return newDesired;
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
      </Box>
      <Box>
        <HStack>
          {[...Array(bufferSize)].map((_, i) => (
            <BreachProtocolDesiredSelect key={i} index={i} />
          ))}
        </HStack>
      </Box>
    </>
  );
};
