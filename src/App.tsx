import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello", value);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          value={value}
          onChange={onChangeHandler}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
