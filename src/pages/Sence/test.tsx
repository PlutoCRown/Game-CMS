import { Button } from "antd";
import { useState } from "react";

const useA = () => {
  const [a, setA] = useState(10);
  return { a, setA };
};

const useB = () => {
  const [b, setB] = useState(1);
  return { b, setB };
};

const useC = () => {
  const { a } = useA();
  const { b } = useB();
  return a + b;
};

export const Component = () => {
  const v = useC();
  const { setA, a } = useA();
  return (
    <>
      <Button onClick={() => setA((a) => a + 1)}>{v}</Button>
      <Button onClick={() => setA((a) => a++)}>{a}</Button>
    </>
  );
};
