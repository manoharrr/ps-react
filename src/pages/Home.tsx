import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import HomeComponent from "../components/Home/HomeComponent";
import ShowSBTransactions from "../components/Transaction/ShowSBTransactions";
import { TitleChange } from "../utils/titleChange";

const Home: React.FunctionComponent = () => {
  TitleChange("Home");
  return (
    <>
      <ErrorBoundary>
        <HomeComponent />
        <ShowSBTransactions type='savings_account' />
      </ErrorBoundary>
    </>
  );
};
export default Home;
