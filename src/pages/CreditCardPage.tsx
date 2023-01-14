import React from "react";
import CreditCard from "../components/CreditCard/CreditCard";
import ErrorBoundary from "../components/ErrorBoundary";
import ShowSBTransactions from "../components/Transaction/ShowSBTransactions";
import { TitleChange } from "../utils/titleChange";

const CreditCardPage: React.FunctionComponent = () => {
  TitleChange("Credit Card");
  return (
    <ErrorBoundary>
      <CreditCard />
      <ShowSBTransactions type='credit_card' />
    </ErrorBoundary>
  );
};
export default CreditCardPage;
