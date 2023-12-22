import { useState, useTransition } from "react";
import WorkerFactory from "@/util/WorkerFactory";
import worker from "./worker";

export const Component = () => {
  const workerInstance = WorkerFactory(worker);
  const [data, setData] = useState(null);
  const [_, startTransition] = useTransition();

  const processData = () => {
    startTransition(() => {
      workerInstance.onmessage = (event) => {
        setData(event.data);
      };
      workerInstance.postMessage(data);
    });
  };

  return (
    <div>
      <button onClick={processData}>处理数据</button>
      {data}
    </div>
  );
};
