import { Select } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { gridState } from "../App";

interface BreachProtocolGridSelectProps {
  col: number;
  row: number;
}

export const BreachProtocolGridSelect: React.FC<
  BreachProtocolGridSelectProps
> = ({ col, row }) => {
  const [grid, gridSetter] = useRecoilState(gridState);

  return (
    <>
      <Select
        value={grid[row][col]}
        onChange={(e) => {
          gridSetter((oldGrid) => {
            let newGrid: string[][] = JSON.parse(JSON.stringify(oldGrid));
            newGrid[row][col] = e.target.value;
            console.log(newGrid);
            return newGrid;
          });
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
