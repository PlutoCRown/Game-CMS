import { useState } from "react";

export const Component = () => {
  const [counter, setCounter] = useState(0);
  const a = {
    counter: -counter,
  };
  return (
    <div onClick={() => setCounter(counter + 1)}>
      {counter} <h2>{a.counter}</h2>
    </div>
  );
};
