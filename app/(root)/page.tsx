import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProduct,
  getFeaturedProducts,
} from "@/lib/actions/product.action";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ViewAllProductsButton from "@/components/view-all-products-button";
import IconBoxes from "@/components/icon-boxes";
import DealCountDown from "@/components/deal-countdown";

const HomePage = async () => {
  const latestProducts = await getLatestProduct();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
      <ViewAllProductsButton />
      <DealCountDown />

      <IconBoxes />
    </>
  );
};

export default HomePage;
