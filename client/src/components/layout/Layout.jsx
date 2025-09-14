import Header from "./header/Header";
import Footer from "./footer/Footer";
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