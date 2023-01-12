import React from "react";
import LoginComponent from "../components/LoginComponent";
import { TitleChange } from "../utils/titleChange";

const Login: React.FunctionComponent = () => {
  TitleChange("Login");
  return (
    <>
      <LoginComponent />
    </>
  );
};
export default Login;
