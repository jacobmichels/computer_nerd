import { BreachProtocolGridSelect } from "./BreachProtocolGridSelect";

interface BreachProtocolRowProps {
  cols: number;
  row: number;
}

export const BreachProtocolRow: React.FC<BreachProtocolRowProps> = ({
  cols,
  row,
}) => {
  let selects = [];
  for (let i = 0; i < cols; i++) {
    selects.push(<BreachProtocolGridSelect key={i} col={i} row={row} />);
  }
  return <>{selects}</>;
};
