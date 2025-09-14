// src/components/layout/Layout.jsx
import Header from "./Header";
import Footer from "./Footer/Footer";
import FeatureList from "../feature/FeatureList";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <FeatureList /> {/* visas alltid längst ner på sidan */}
      <Footer />
    </>
  );
}
