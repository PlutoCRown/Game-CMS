import reactLogo from "./assets/react.svg";
import "./App.css";
import { useGlobalStore } from "./store";
import React from "react";

const App: React.FC = () => {
  const count = useGlobalStore((state) => state.count);
  const setCount = useGlobalStore((state) => state.setCount);
  const getCount = useGlobalStore((state) => state.getCount);
  return (
    <div className="App">
      <div>
        <a onClick={() => console.log(getCount())}>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rspack + React + TypeScript + Bun</h1>
      <div className="card">
        <button onClick={() => setCount(1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Rspack and React logos to learn more
      </p>
    </div>
  );
};

export default App;