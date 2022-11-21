import { BreachProtocolSelect } from "./BreachProtocolSelect";

interface BreachProtocolRowProps {
  cols: number;
}

export const BreachProtocolRow: React.FC<BreachProtocolRowProps> = ({
  cols,
}) => {
  return (
    <>
      {[...Array(cols)].map((_, i) => (
        <BreachProtocolSelect key={i} />
      ))}
    </>
  );
};
