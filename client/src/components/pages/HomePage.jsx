import Hero from "../section/hero/Hero";
import Spot from "../section/spot/Spot";
import ProductGrid from "../products/ProductGrid";

export default function HomePage() {
  return (
    <>
      <Hero
        title="Utforska de senaste trenderna"
        text="Handla idag och få exklusiva erbjudanden!"
      />
      <Spot />
      <ProductGrid />
    </>
  );
}
