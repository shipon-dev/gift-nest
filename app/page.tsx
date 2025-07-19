"use client";

import { ScrollUpButton } from "@/components/ScrollUpButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfettiFunction } from "@/hooks/useConfetti";
import {
  Gift,
  Heart,
  Moon,
  Share2,
  ShoppingCart,
  Star,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

const allProducts = [
  {
    id: 1,
    name: "Personalized Photo Frame",
    price: 29.99,
    originalPrice: 39.99,
    images: [
      "/placeholder.svg?height=400&width=400&text=Photo+Frame+1",
      "/placeholder.svg?height=400&width=400&text=Photo+Frame+2",
      "/placeholder.svg?height=400&width=400&text=Photo+Frame+3",
    ],
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    category: "Personalized",
    description:
      "Beautiful handcrafted photo frame perfect for displaying your cherished memories.",
  },
  {
    id: 2,
    name: "Luxury Candle Set",
    price: 45.99,
    originalPrice: null,
    images: [
      "/placeholder.svg?height=400&width=400&text=Candle+Set+1",
      "/placeholder.svg?height=400&width=400&text=Candle+Set+2",
      "/placeholder.svg?height=400&width=400&text=Candle+Set+3",
    ],
    rating: 4.9,
    reviews: 89,
    badge: "New",
    category: "Home Decor",
    description:
      "Premium scented candles that create a warm and inviting atmosphere.",
  },
  {
    id: 3,
    name: "Custom Jewelry Box",
    price: 79.99,
    originalPrice: 99.99,
    images: [
      "/placeholder.svg?height=400&width=400&text=Jewelry+Box+1",
      "/placeholder.svg?height=400&width=400&text=Jewelry+Box+2",
      "/placeholder.svg?height=400&width=400&text=Jewelry+Box+3",
    ],
    rating: 4.7,
    reviews: 156,
    badge: "Sale",
    category: "Jewelry",
    description:
      "Elegant wooden jewelry storage with custom engraving options.",
  },
  {
    id: 4,
    name: "Artisan Coffee Mug",
    price: 24.99,
    originalPrice: null,
    images: [
      "/placeholder.svg?height=400&width=400&text=Coffee+Mug+1",
      "/placeholder.svg?height=400&width=400&text=Coffee+Mug+2",
      "/placeholder.svg?height=400&width=400&text=Coffee+Mug+3",
    ],
    rating: 4.6,
    reviews: 203,
    badge: null,
    category: "Accessories",
    description: "Handmade ceramic mug perfect for your morning coffee ritual.",
  },
  {
    id: 5,
    name: "Silk Scarf Collection",
    price: 89.99,
    originalPrice: 120.99,
    images: [
      "/placeholder.svg?height=400&width=400&text=Silk+Scarf+1",
      "/placeholder.svg?height=400&width=400&text=Silk+Scarf+2",
      "/placeholder.svg?height=400&width=400&text=Silk+Scarf+3",
    ],
    rating: 4.8,
    reviews: 67,
    badge: "Limited",
    category: "Fashion",
    description: "Luxurious silk scarves with unique patterns and designs.",
  },
  {
    id: 6,
    name: "Crystal Vase",
    price: 149.99,
    originalPrice: null,
    images: [
      "/placeholder.svg?height=400&width=400&text=Crystal+Vase+1",
      "/placeholder.svg?height=400&width=400&text=Crystal+Vase+2",
      "/placeholder.svg?height=400&width=400&text=Crystal+Vase+3",
    ],
    rating: 4.9,
    reviews: 91,
    badge: "Premium",
    category: "Home Decor",
    description: "Stunning crystal vase that adds elegance to any room.",
  },
  {
    id: 7,
    name: "Gold Necklace",
    price: 299.99,
    originalPrice: 399.99,
    images: [
      "/placeholder.svg?height=400&width=400&text=Gold+Necklace+1",
      "/placeholder.svg?height=400&width=400&text=Gold+Necklace+2",
      "/placeholder.svg?height=400&width=400&text=Gold+Necklace+3",
    ],
    rating: 4.9,
    reviews: 234,
    badge: "Best Seller",
    category: "Jewelry",
    description: "Elegant 18k gold necklace with custom pendant options.",
  },
  {
    id: 8,
    name: "Leather Wallet",
    price: 59.99,
    originalPrice: null,
    images: [
      "/placeholder.svg?height=400&width=400&text=Leather+Wallet+1",
      "/placeholder.svg?height=400&width=400&text=Leather+Wallet+2",
      "/placeholder.svg?height=400&width=400&text=Leather+Wallet+3",
    ],
    rating: 4.6,
    reviews: 145,
    badge: null,
    category: "Accessories",
    description:
      "Premium leather wallet with RFID protection and personalization.",
  },
];

const categories = [
  {
    name: "Personalized Gifts",
    icon: "🎨",
    count: 45,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Home Decor",
    icon: "🏠",
    count: 32,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Jewelry",
    icon: "💎",
    count: 28,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    name: "Fashion",
    icon: "👗",
    count: 24,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Accessories",
    icon: "👜",
    count: 19,
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Electronics",
    icon: "📱",
    count: 15,
    gradient: "from-teal-500 to-blue-500",
  },
];

function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [product.images.length]);

  const handleProductClick = () => {
    router.push(`?product=${product.id}`, { scroll: false });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: product.name,
      text: `Check out this amazing ${product.name} for $${product.price}!`,
      url: `${window.location.origin}?product=${product.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Product link copied to clipboard!");
    }
  };

  return (
    <div className="p-2">
      <Card className="group transition-all duration-300 bg-card border-border  cursor-pointer w-full">
        <CardContent className="p-0" onClick={handleProductClick}>
          <div className="relative overflow-hidden">
            <Image
              src={product.images[currentImageIndex] || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* {product.badge && (
              <Badge
                className={`absolute top-3 left-3 font-bold shadow-lg ${
                  product.badge === "Sale"
                    ? "bg-gradient-to-r from-red-500 to-pink-500"
                    : product.badge === "New"
                    ? "bg-gradient-to-r from-green-500 to-teal-500"
                    : product.badge === "Limited"
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                }`}>
                {product.badge}
              </Badge>
            )} */}

            {/* <Button
              size="icon"
              variant="secondary"
              className="absolute top-3 right-12 opacity-0 group-hover:opacity-100 transition-all bg-background/90 hover:bg-background shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <Heart className="h-4 w-4 text-red-500" />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all bg-background/90 hover:bg-background shadow-lg"
              onClick={handleShare}>
              <Share2 className="h-4 w-4 text-blue-500" />
            </Button> */}

            {/* <Button
              size="icon"
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <ShoppingCart className="h-4 w-4" />
            </Button> */}

            <div className="absolute bottom-3 left-3 flex gap-1">
              {product.images.map((_: any, index: number) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold mb-2 text-foreground group-hover:text-purple-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                ({product.reviews})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProductDetails({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [product.images.length]);

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering: ${
      product.name
    } (Quantity: ${quantity}) - $${(product.price * quantity).toFixed(2)}`;
    const whatsappUrl = `https://wa.me/+8801595078408?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleMessengerOrder = () => {
    const message = `Hi! I'm interested in ordering: ${
      product.name
    } (Quantity: ${quantity}) - $${(product.price * quantity).toFixed(2)}`;
    const messengerUrl = `https://m.me/giftnest?text=${encodeURIComponent(
      message
    )}`;
    window.open(messengerUrl, "_blank");
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="relative mb-4">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={500}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1}/{product.images.length}
                </div>
                {/* <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/30 rounded-full h-1">
                    <div
                      className="bg-white rounded-full h-1 transition-all duration-4000 ease-linear"
                      style={{
                        width: `${
                          ((selectedImage + 1) / product.images.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div> */}
              </div>

              <div className="flex gap-3">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === index
                        ? "border-purple-500 scale-110"
                        : "border-border"
                    }`}>
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4 text-foreground">
                  {product.name}
                </h1>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg px-3 py-1">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg">Quantity:</span>
                <div className="flex items-center border rounded-xl">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    -
                  </Button>
                  <span className="px-6 py-2 font-semibold text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg text-lg py-6">
                  <Image src={"/whatsapp.svg"} alt="w" width={20} height={20} />
                  Order via WhatsApp 💬
                </Button>
                <Button
                  onClick={handleMessengerOrder}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg text-lg py-6">
                  <Image
                    src={"/messenger.svg"}
                    alt="w"
                    width={20}
                    height={20}
                  />
                  Order via Messenger 📱
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HorizontalProductScroll({
  title,
  products,
  gradient,
}: {
  title: string;
  products: any[];
  gradient: string;
}) {
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    initialSlide: 0,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <section className="py-12">
      <ScrollUpButton />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2
            className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {title}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="hover:scale-110 transition-transform">
              ←
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="hover:scale-110 transition-transform">
              →
            </Button>
          </div>
        </div>

        <div className="slider-container relative">
          <Slider ref={sliderRef} {...settings}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  // const searchParams = useSearchParams();
  // const productId = searchParams.get("product");
  const selectedProduct = allProducts.find(
    (p) => p.id.toString() === "productId"
  );

  const featuredProducts = allProducts;
  const trendingProducts = allProducts.slice(2, 6);
  const newArrivals = allProducts.slice(4, 8);
  const bestSellers = allProducts.filter((p) => p.badge === "Best Seller");
  const saleProducts = allProducts.filter((p) => p.originalPrice);

  useEffect(() => {
    // Check if confetti has been shown before
    const hasShownConfetti = document.cookie.includes("confettiShown=true");

    if (!hasShownConfetti) {
      ConfettiFunction();
      // Set cookie to expire in 30 days
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      document.cookie = `confettiShown=true; expires=${expiryDate.toUTCString()}; path=/`;
    }
  }, []);

  if (selectedProduct) {
    return <ProductDetails product={selectedProduct} />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-yellow-500 to-[#F87514] bg-clip-text text-transparent drop-shadow-lg font-extrabold">
                  GiftNest
                </span>{" "}
                - এ নিখুঁত উপহারটি খুঁজুন
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                অনন্য, ব্যক্তিগতকৃত উপহার আবিষ্কার করুন যা স্থায়ী স্মৃতি তৈরি
                করে। কাস্টম গয়না থেকে শুরু করে বাড়ির সাজসজ্জা পর্যন্ত, আমাদের
                কাছে সবার জন্য বিশেষ কিছু আছে।
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold shadow-lg transform hover:scale-105 transition-all">
                  <Gift className="mr-2 h-5 w-5" />
                  এখনই অর্ডার করুন
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600&text=Hero+Gift+Collection"
                alt="Gift collection"
                width={600}
                height={600}
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-bold text-lg shadow-lg animate-pulse">
                Free Shipping! 🚚
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <HorizontalProductScroll
        title="✨ Featured Products"
        products={featuredProducts}
        gradient="from-purple-600 to-pink-600"
      />

      {/* Trending Now */}
      <HorizontalProductScroll
        title="🔥 Trending Now"
        products={trendingProducts}
        gradient="from-green-600 to-teal-600"
      />

      {/* Sale Items */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/10 dark:to-pink-950/10">
        <HorizontalProductScroll
          title="💥 Special Offers"
          products={saleProducts}
          gradient="from-red-600 to-pink-600"
        />
      </div>

      {/* New Arrivals */}
      <HorizontalProductScroll
        title="🆕 New Arrivals"
        products={newArrivals}
        gradient="from-blue-600 to-indigo-600"
      />
    </div>
  );
}
