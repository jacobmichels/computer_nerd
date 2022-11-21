import { Select } from "@chakra-ui/react";

export const BreachProtocolSelect: React.FC = () => {
  return (
    <>
      <Select
        onChange={(e) => {
          console.log(e.target.value);
        }}
      >
        <option value="BD">BD</option>
        <option value="E9">E9</option>
        <option value="55">55</option>
        <option value="1C">1C</option>
        <option value="7A">7A</option>
      </Select>
    </>
  );
};
