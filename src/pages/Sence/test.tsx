import { useState, useTransition } from "react";
import { createWorker } from "@/util/WorkerFactory";
import worker from "./worker";

export const Component = () => {
  const workerInstance = createWorker(worker);
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
