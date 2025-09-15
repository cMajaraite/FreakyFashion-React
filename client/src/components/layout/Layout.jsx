import React, { Fragment } from "react"; // Add Fragment import
import Header from "./header/Header";
import Footer from "./footer/Footer";
import FeatureList from "../feature/FeatureList";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Fragment>
      <Header />
      <Outlet /> {/* Use JSX comment syntax */}
      <FeatureList />
      <Footer />
    </Fragment>
  );
}