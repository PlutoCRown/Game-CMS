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
        <a
          onClick={() => {
            setCount(1);
            console.log(getCount());
          }}
        >
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        {count}
      </div>
    </div>
  );
};

export default App;
