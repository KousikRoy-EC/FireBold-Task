import React from "react";

const Arguments = ({ args, setArgs }) => {
  const addArgument = () => {
    const newArgs = [...args];
    newArgs.push({ name: "", value: "false" });
    setArgs(newArgs);
  };

  const changeArgName = (e, index) => {
    const newArgs = [...args];
    newArgs[index].name = e.target.value;
    setArgs(newArgs);
  };

  const changeArgValue = (e, index) => {
    const newArgs = [...args];
    newArgs[index].value = e.target.value;
    setArgs(newArgs);
  };

  const deleteArg = (index) => {
    const newArgs = args.filter((arg, ind) => ind !== index);
    setArgs(newArgs);
  };

  return (
    <div>
      <h2>Arguments</h2>
      <button onClick={addArgument}>Add Argument</button>
      {args.map((arg, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Enter argument name"
            value={arg.name}
            onChange={(e) => changeArgName(e, index)}
          />
          <select
            value={arg.value}
            onChange={(e) => changeArgValue(e, index)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button onClick={() => deleteArg(index)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default Arguments;
