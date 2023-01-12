import React from "react";
import SignUpComponent from "../components/SignUpComponent";
import { TitleChange } from "../utils/titleChange";

const SignUp: React.FunctionComponent = () => {
  TitleChange("Sign Up");
  return (
    <>
      <SignUpComponent />
    </>
  );
};
export default SignUp;
