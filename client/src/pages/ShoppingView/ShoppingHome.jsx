import React, { useEffect, useState, useMemo } from "react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusinessIcon,
  BriefcaseIcon,
  CheckIcon,
  CherryIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DiscIcon,
  FlameIcon,
  GlassWaterIcon,
  PizzaIcon,
  RadiationIcon,
  WalletCardsIcon,
  WalletIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/ShoppingView/ShoppingProductTile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ShoppingProductDetails from "@/components/ShoppingView/ShoppingProductDetails";

const categoriesWithIcons = [
  { id: "handbag", label: "Handbag", icon: BriefcaseIcon },
  { id: "purse", label: "Purse", icon: WalletIcon },
  { id: "accessories", label: "Accessories", icon: CherryIcon },
  { id: "cardholder", label: "Cardholder", icon: WalletCardsIcon },
  { id: "office", label: "Office", icon: BriefcaseBusinessIcon },
];

const brandsWithIcons = [
  { id: "nike", label: "Nike", icon: CheckIcon },
  { id: "adidas", label: "Adidas", icon: DiscIcon },
  { id: "puma", label: "Puma", icon: FlameIcon },
  { id: "levi", label: "Levi's", icon: GlassWaterIcon },
  { id: "zara", label: "Zara", icon: PizzaIcon },
  { id: "h&m", label: "H&M", icon: RadiationIcon },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const slides = useMemo(() => [bannerOne, bannerTwo, bannerThree], []);

  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate(`/shop/listings`);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (productList && productList.length > 0) {
      const randomProducts = [...productList]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      setFeaturedProducts(randomProducts);
    }
  }, [productList]);

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product added to cart successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous slide"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="w-6 h-6 text-primary" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next slide"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
        >
          <ChevronRightIcon className="w-6 h-6 text-primary" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcons.length > 0 ? (
              categoriesWithIcons.map((categoryItem) => (
                <Card
                  onClick={() =>
                    handleNavigateToListingPage(categoryItem, "category")
                  }
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  key={categoryItem.id}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {brandsWithIcons.length > 0 ? (
              brandsWithIcons.map((brandItem) => (
                <Card
                  onClick={() =>
                    handleNavigateToListingPage(brandItem, "brand")
                  }
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  key={brandItem.id}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{brandItem.label}</span>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No brands available</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  key={productItem.id}
                  product={productItem}
                  handleAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p className="text-center col-span-4">No products available</p>
            )}
          </div>
        </div>
      </section>
      <ShoppingProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
