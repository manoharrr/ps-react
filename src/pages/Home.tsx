import React from "react";
import "react-multi-carousel/lib/styles.css";
import HomeComponent from "../components/Home/HomeComponent";
import { TitleChange } from "../utils/titleChange";

const Home: React.FunctionComponent = () => {
  TitleChange("Home");
  return (
    <>
      <HomeComponent />
    </>
  );
};
export default Home;
