import React from "react";
import CreditCard from "../components/CreditCard/CreditCard";
import { TitleChange } from "../utils/titleChange";

const CreditCardPage: React.FunctionComponent = () => {
  TitleChange("Credit Card");
  return (
    <>
      <CreditCard />
    </>
  );
};
export default CreditCardPage;
