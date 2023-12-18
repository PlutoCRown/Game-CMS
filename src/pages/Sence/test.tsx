import { test } from "@/util";
import { Button } from "antd";
import { useState } from "react";

export const Component = () => {
  const v = test();
  console.log("test", v);
  return <>{JSON.stringify(v)}</>;
};
