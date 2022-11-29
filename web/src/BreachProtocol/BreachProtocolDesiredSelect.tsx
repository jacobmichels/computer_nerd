import { Select } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { desiredStringState } from "../App";

interface BreachProtocolDesiredSelectProps {
  index: number;
}

export const BreachProtocolDesiredSelect: React.FC<
  BreachProtocolDesiredSelectProps
> = ({ index }) => {
  const [desired, desiredSetter] = useRecoilState(desiredStringState);

  return (
    <>
      <Select
        value={desired[index]}
        onChange={(e) => {
          desiredSetter((oldState) => {
            let newState: string[] = JSON.parse(JSON.stringify(oldState));
            newState[index] = e.target.value;
            console.log(newState);
            return newState;
          });
        }}
      >
        <option value="BD">BD</option>
        <option value="E9">E9</option>
        <option value="55">55</option>
        <option value="1C">1C</option>
        <option value="7A">7A</option>
        <option value="**">**</option>
      </Select>
    </>
  );
};
