import { Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { statusMessage } from "./App";

export const StatusText = () => {
  const status = useRecoilValue(statusMessage);

  return <Text>{status}</Text>;
};
