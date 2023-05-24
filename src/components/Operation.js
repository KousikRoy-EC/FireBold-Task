import React, { useEffect, useState } from "react";

const Operations = ({ operation, setOperation, args, updateParent }) => {
  const [leftOperation, setLeftOperation] = useState({
    type: "constant",
    value: "false",
  });
  const [rightOperation, setRightOperation] = useState({
    type: "constant",
    value: "false",
  });

  useEffect(() => {
    if (updateParent) updateParent(operation);
  }, [operation]);

  const handleTypeChange = (e) => {
    let newOperation;
    switch (e.target.value) {
      case "argument":
        newOperation = { type: "argument", value: args[0]?.name };
        break;
      case "constant":
        newOperation = { type: "constant", value: operation.value };
        break;
      case "or":
        newOperation = { type: "or", left: leftOperation, right: rightOperation };
        break;
      case "and":
        newOperation = { type: "and", left: leftOperation, right: rightOperation };
        break;
      default:
        newOperation = operation;
        break;
    }
    setOperation(newOperation);
  };

  const handleValueChange = (e) => {
    if (operation.type === "constant" || operation.type === "argument") {
      let newOperation = { ...operation };
      newOperation.value = e.target.value;
      setOperation(newOperation);
    }
  };

  return (
    <div>
      <select value={operation.type} onChange={handleTypeChange}>
        <option value="argument">Argument</option>
        <option value="constant">Constant</option>
        <option value="and">AND</option>
        <option value="or">OR</option>
      </select>

      {operation.type === "constant" && (
        <select
          defaultValue={operation.value}
          onChange={(e) => handleValueChange(e)}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      )}

      {operation.type === "argument" && (
        <select
          defaultValue={args[0] ? args[0].name : ""}
          onChange={(e) => handleValueChange(e)}
        >
          {args.map((arg) => (
            <option key={arg.name} value={arg.name}>
              {arg.name}
            </option>
          ))}
        </select>
      )}

      {(operation.type === "and" || operation.type === "or") && (
        <div style={{ marginLeft: "10px" }}>
          <Operations
            operation={leftOperation}
            setOperation={setLeftOperation}
            updateParent={(newOp) =>
              setOperation({ ...operation, left: newOp })
            }
            args={args}
          />
          <Operations
            operation={rightOperation}
            setOperation={setRightOperation}
            updateParent={(newOp) =>
              setOperation({ ...operation, right: newOp })
            }
            args={args}
          />
        </div>
      )}
    </div>
  );
};

export default Operations;
