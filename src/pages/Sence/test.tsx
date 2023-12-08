import { Button } from "antd";
import { useState } from "react";

const useA = () => {
  const [a, setA] = useState(10);
  return { a, setA };
};

const useC = () => {
  const { a } = useA();
  return a;
};

export const Component = () => {
  const v = useC();
  const { setA, a } = useA();
  return (
    <>
      <Button onClick={() => setA((a) => a + 1)}>{v}</Button>
      <Button onClick={() => setA((a) => a + 1)}>{a}</Button>
    </>
  );
};
