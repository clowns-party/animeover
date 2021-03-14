// core
import React from "react";
import { SignInForm } from "./Elements/signInForm/signInForm";
import "antd/dist/antd.css";
import { service } from "./Services";

function App() {
  // не тут должно быть TEMP
  const call = async () => {
    const result = await service.me();
    console.log(result);
  };
  return (
    <div className="App">
      <SignInForm />
      <button type="button" onClick={call}>
        TEST AUTH ME!
      </button>
    </div>
  );
}

export default App;
