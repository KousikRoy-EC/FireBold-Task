import React, { useState } from "react";
import Arguments from "./Arguments";
import Operations from "./Operation";

const Expression = () => {
  const [args, setArgs] = useState([]);
  const [operation, setOperation] = useState({ type: "constant", value: "false" });

  const performLogic = (op) => {
    switch (op.type) {
      case "constant":
        return op.value === "true";
      case "argument":
        const res = args.filter((arg) => op.value === arg.name);
        return res[0] ? res[0].value === "true" : false;
      case "or":
        return performLogic(op.left) || performLogic(op.right);
      case "and":
        return performLogic(op.left) && performLogic(op.right);
      default:
        return false;
    }
  };

  return (
    <div>
      <Arguments args={args} setArgs={setArgs} />
      <h2>Operation</h2>
      <Operations operation={operation} setOperation={setOperation} args={args} />
      <h2>Result: {performLogic(operation).toString()}</h2>
    </div>
  );
};

export default Expression;

