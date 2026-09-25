import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { PRODUCTS } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";


// ======================================================
// ANIMATION
// ======================================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};


// ======================================================
// PRODUCT DETAIL
// ======================================================

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = PRODUCTS.find(
    (item) => String(item.id) === String(id)
  );

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[product.sizes.length > 2 ? 2 : 0] || ""
  );

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || ""
  );

  const [quantity, setQuantity] = useState(1);

  const [activeImage, setActiveImage] = useState(0);

  const [activeTab, setActiveTab] = useState("description");

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (!isVideoOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsVideoOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVideoOpen]);

  const isFavorite = product ? isInWishlist(product.id) : false;

  const [addedMessage, setAddedMessage] = useState(false);

  // --------------------------------------------------
  // PRODUCT NOT FOUND
  // --------------------------------------------------

  if (!product) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-[#333] mb-4">
            Product not found
          </h1>

          <Link
            to="/products"
            className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-[#8A2BEF] text-white font-medium"
          >
            Back to products
          </Link>
        </div>
      </section>
    );
  }


  // ======================================================
  // PRODUCT GALLERY
  // ======================================================

  const gallery = useMemo(() => {
    /*
      Пока в PRODUCTS у товара есть только одна картинка.

      Поэтому используем её как основное изображение.
      Если позже добавишь:

      gallery: [image1, image2, image3]

      сюда автоматически будут использоваться все фотографии.
    */

    if (product.gallery?.length) {
      return product.gallery;
    }

    return [
      product.image,
      product.image,
      product.image,
    ];
  }, [product]);


  // ======================================================
  // SIMILAR PRODUCTS
  // ======================================================

  const similarProducts = useMemo(() => {
    return PRODUCTS
      .filter(
        (item) =>
          item.id !== product.id &&
          item.category === product.category
      )
      .slice(0, 8);
  }, [product]);


  // ======================================================
  // PRICE
  // ======================================================

  const totalPrice = (
    Number(product.price) * quantity
  ).toFixed(2);


  // ======================================================
  // CART
  // ======================================================

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, selectedSize, selectedColor, quantity);
      setAddedMessage(true);
      setTimeout(() => {
        setAddedMessage(false);
      }, 2200);
    }
  };


  // ======================================================
  // WISHLIST
  // ======================================================

  const handleWishlist = () => {
    if (product) {
      toggleWishlist(product);
    }
  };


  // ======================================================
  // QUANTITY
  // ======================================================

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };


  // ======================================================
  // RATING
  // ======================================================

  const rating = product.rating || 4.5;

  const fullStars = Math.floor(rating);

  const hasHalfStar = rating % 1 >= 0.5;


  // ======================================================
  // JSX
  // ======================================================

  return (
    <main className="w-full bg-white text-[#333] overflow-hidden">

      {/* ==================================================
          PRODUCT TOP
      ================================================== */}

      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="
          max-w-[1280px]
          mx-auto
          px-5
          lg:px-8
          pt-8
          pb-16
        "
      >

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 xl:gap-12">

          {/* ==================================================
              LEFT - GALLERY
          ================================================== */}

          <motion.div
            variants={fadeUp}
            className="flex gap-4"
          >

            {/* THUMBNAILS */}

            <div className="hidden sm:flex w-[72px] flex-col items-center gap-4 pt-20">

              {gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`
                    relative
                    w-[62px]
                    h-[78px]
                    rounded-lg
                    overflow-hidden
                    bg-[#f5f5f5]
                    border
                    transition-all
                    ${
                      activeImage === index
                        ? "border-[#333] scale-[1.02]"
                        : "border-transparent"
                    }
                  `}
                >

                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                </button>
              ))}

              <button
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-[#f4f4f4]
                  flex
                  items-center
                  justify-center
                  hover:bg-[#e9e9e9]
                  transition
                "
              >
                <KeyboardArrowUpIcon fontSize="small" />
              </button>

              <button
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-[#f4f4f4]
                  flex
                  items-center
                  justify-center
                  hover:bg-[#e9e9e9]
                  transition
                "
              >
                <KeyboardArrowDownIcon fontSize="small" />
              </button>

            </div>


            {/* MAIN IMAGE */}

            <div
              className="
                relative
                flex-1
                bg-[#f3f3f3]
                rounded-sm
                overflow-hidden
                min-h-[500px]
                lg:min-h-[620px]
              "
            >

              <AnimatePresence mode="wait">

                <motion.img
                  key={activeImage}
                  src={gallery[activeImage]}
                  alt={product.title}
                  initial={{
                    opacity: 0,
                    scale: 1.03,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                  "
                />

              </AnimatePresence>


              {/* MOBILE THUMBNAILS */}

              <div
                className="
                  absolute
                  bottom-4
                  left-1/2
                  -translate-x-1/2
                  flex
                  gap-2
                  sm:hidden
                "
              >

                {gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`
                      w-12
                      h-12
                      rounded-md
                      overflow-hidden
                      border-2
                      ${
                        activeImage === index
                          ? "border-[#8A2BEF]"
                          : "border-white"
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

              </div>

            </div>

          </motion.div>


          {/* ==================================================
              RIGHT - PRODUCT INFO
          ================================================== */}

          <motion.div
            variants={fadeUp}
            className="pt-1"
          >

            {/* BREADCRUMB */}

            <div className="flex items-center gap-2 text-xs text-[#777] mb-5">

              <Link
                to="/"
                className="hover:text-[#8A2BEF] transition"
              >
                Shop
              </Link>

              <span>›</span>

              <Link
                to={`/products?category=${product.category}`}
                className="hover:text-[#8A2BEF] transition capitalize"
              >
                {product.category}
              </Link>

              <span>›</span>

              <span>
                {product.subCategory}
              </span>

            </div>


            {/* TITLE */}

            <h1
              className="
                text-[28px]
                sm:text-[32px]
                lg:text-[34px]
                leading-[1.25]
                font-semibold
                tracking-[-0.5px]
                text-[#363636]
                max-w-[500px]
              "
            >
              {product.title}
            </h1>


            {/* RATING */}

            <div className="flex items-center gap-4 mt-5">

              <div className="flex items-center gap-[2px]">

                {Array.from({ length: 5 }).map((_, index) => {

                  if (index < fullStars) {
                    return (
                      <StarIcon
                        key={index}
                        sx={{
                          fontSize: 19,
                          color: "#F7C51E",
                        }}
                      />
                    );
                  }

                  if (
                    index === fullStars &&
                    hasHalfStar
                  ) {
                    return (
                      <StarIcon
                        key={index}
                        sx={{
                          fontSize: 19,
                          color: "#F7C51E",
                        }}
                      />
                    );
                  }

                  return (
                    <StarBorderIcon
                      key={index}
                      sx={{
                        fontSize: 19,
                        color: "#F7C51E",
                      }}
                    />
                  );
                })}

              </div>

              <span className="text-sm text-[#666]">
                {rating}
              </span>

              <span className="text-[#ddd]">
                |
              </span>

              <span className="text-sm text-[#666]">
                120 comment
              </span>

            </div>


            {/* DIVIDER */}

            <div className="w-full h-px bg-[#eeeeee] my-6" />


            {/* SIZE */}

            <div>

              <div className="flex items-center gap-4 mb-4">

                <h3 className="text-sm font-semibold">
                  Select Size
                </h3>

                <button
                  className="
                    text-xs
                    text-[#777]
                    hover:text-[#8A2BEF]
                    transition
                  "
                >
                  Size Guide
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 14,
                      ml: 0.5,
                    }}
                  />
                </button>

              </div>

              <div className="flex flex-wrap gap-3">

                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-10
                      h-10
                      rounded-lg
                      border
                      text-xs
                      font-medium
                      transition-all
                      ${
                        selectedSize === size
                          ? "bg-[#383838] text-white border-[#383838]"
                          : "bg-white text-[#444] border-[#d7d7d7] hover:border-[#383838]"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}

              </div>

            </div>


            {/* COLORS */}

            <div className="mt-7">

              <h3 className="text-sm font-semibold mb-4">
                Colours Available
              </h3>

              <div className="flex items-center gap-3">

                {product.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      w-7
                      h-7
                      rounded-full
                      flex
                      items-center
                      justify-center
                      transition
                      ${
                        selectedColor === color
                          ? "ring-2 ring-[#333] ring-offset-2"
                          : ""
                      }
                    `}
                  >

                    <span
                      className="
                        w-5
                        h-5
                        rounded-full
                        border
                        border-[#ddd]
                      "
                      style={{
                        backgroundColor: color,
                      }}
                    />

                  </button>
                ))}

              </div>

            </div>


            {/* QUANTITY + ADD */}

            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              {/* QUANTITY */}

              <div
                className="
                  h-12
                  border
                  border-[#ddd]
                  rounded-lg
                  flex
                  items-center
                  justify-between
                  px-2
                  w-full
                  sm:w-[125px]
                "
              >

                <button
                  onClick={decreaseQuantity}
                  className="
                    w-8
                    h-8
                    rounded
                    flex
                    items-center
                    justify-center
                    hover:bg-[#f5f5f5]
                  "
                >
                  <RemoveIcon sx={{ fontSize: 17 }} />
                </button>

                <span className="text-sm font-medium">
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  className="
                    w-8
                    h-8
                    rounded
                    flex
                    items-center
                    justify-center
                    hover:bg-[#f5f5f5]
                  "
                >
                  <AddIcon sx={{ fontSize: 17 }} />
                </button>

              </div>


              {/* ADD TO CART */}

              <button
                onClick={handleAddToCart}
                className="
                  h-12
                  flex-1
                  rounded-lg
                  bg-[#8A2BEF]
                  hover:bg-[#7420d0]
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-medium
                  text-sm
                  transition-all
                  active:scale-[0.98]
                "
              >

                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: 19 }}
                />

                Add to cart

              </button>


              {/* PRICE */}

              <div
                className="
                  h-12
                  px-7
                  rounded-lg
                  border
                  border-[#999]
                  flex
                  items-center
                  justify-center
                  font-semibold
                  text-sm
                  min-w-[110px]
                "
              >
                ${totalPrice}
              </div>

            </div>


            {/* SUCCESS MESSAGE */}

            <AnimatePresence>

              {addedMessage && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  className="
                    mt-3
                    rounded-lg
                    bg-[#ecfff4]
                    text-[#16854c]
                    px-4
                    py-3
                    text-sm
                  "
                >
                  Product added to cart successfully.
                </motion.div>
              )}

            </AnimatePresence>


            {/* WISHLIST */}

            <button
              onClick={handleWishlist}
              className="
                mt-4
                flex
                items-center
                gap-2
                text-sm
                text-[#555]
                hover:text-[#8A2BEF]
                transition
              "
            >

              {isFavorite ? (
                <FavoriteIcon
                  sx={{
                    fontSize: 20,
                    color: "#8A2BEF",
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ fontSize: 20 }}
                />
              )}

              {isFavorite
                ? "Remove from wishlist"
                : "Add to wishlist"}

            </button>


            {/* BENEFITS */}

            <div className="border-t border-[#eeeeee] mt-7 pt-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">

                <Benefit
                  icon={<SecurityOutlinedIcon />}
                  title="Secure payment"
                />

                <Benefit
                  icon={<StraightenOutlinedIcon />}
                  title="Size & Fit"
                />

                <Benefit
                  icon={<LocalShippingOutlinedIcon />}
                  title="Free shipping"
                />

                <Benefit
                  icon={<AutorenewOutlinedIcon />}
                  title="Free Shipping & Returns"
                />

              </div>

            </div>

          </motion.div>

        </div>

      </motion.section>


      {/* ==================================================
          PRODUCT DESCRIPTION
      ================================================== */}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="
          max-w-[1280px]
          mx-auto
          px-5
          lg:px-8
          pb-20
        "
      >

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14">

          {/* DESCRIPTION */}

          <div>

            <SectionTitle>
              Product Description
            </SectionTitle>


            {/* TABS */}

            <div className="flex items-center gap-7 border-b border-[#e5e5e5] mt-5">

              <TabButton
                active={activeTab === "description"}
                onClick={() => setActiveTab("description")}
              >
                Description
              </TabButton>

              <TabButton
                active={activeTab === "comments"}
                onClick={() => setActiveTab("comments")}
              >
                User comments
                <span className="ml-1 text-[10px] bg-[#8A2BEF] text-white rounded px-1.5 py-0.5">
                  21
                </span>
              </TabButton>

              <TabButton
                active={activeTab === "questions"}
                onClick={() => setActiveTab("questions")}
              >
                Question & Answer
                <span className="ml-1 text-[10px] bg-[#555] text-white rounded px-1.5 py-0.5">
                  4
                </span>
              </TabButton>

            </div>


            <AnimatePresence mode="wait">

              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  className="pt-5"
                >

                  <p className="text-[13px] leading-6 text-[#777]">
                    This stylish {product.title.toLowerCase()} from{" "}
                    {product.brand} is designed for everyday comfort
                    and effortless style. The carefully selected fabric
                    provides a comfortable feel while maintaining a
                    modern look.
                  </p>

                  <p className="text-[13px] leading-6 text-[#777] mt-3">
                    Perfect for casual outfits, everyday activities
                    and creating your own personal style.
                  </p>

                </motion.div>
              )}


              {activeTab === "comments" && (
                <motion.div
                  key="comments"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="pt-5"
                >

                  <p className="text-sm text-[#777]">
                    Customers have rated this product{" "}
                    <strong className="text-[#333]">
                      {rating}/5
                    </strong>.
                  </p>

                  <div className="mt-4 p-4 rounded-lg bg-[#f8f8f8]">
                    <p className="text-sm font-medium">
                      Great quality and comfortable fit.
                    </p>
                    <p className="text-xs text-[#888] mt-2">
                      Verified customer
                    </p>
                  </div>

                </motion.div>
              )}


              {activeTab === "questions" && (
                <motion.div
                  key="questions"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="pt-5"
                >

                  <div className="space-y-4">

                    <div>
                      <p className="text-sm font-medium">
                        Is this product available in all sizes?
                      </p>
                      <p className="text-xs text-[#888] mt-1">
                        Available sizes:{" "}
                        {product.sizes?.join(", ")}.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Does the product have different colours?
                      </p>
                      <p className="text-xs text-[#888] mt-1">
                        Yes, several colour options are available.
                      </p>
                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>


            {/* SPECIFICATIONS */}

            <div className="grid grid-cols-2 sm:grid-cols-3 mt-6 rounded-lg overflow-hidden bg-[#fafafa]">

              <Specification
                title="Fabric"
                value="Bio-washed Cotton"
              />

              <Specification
                title="Pattern"
                value="Printed"
              />

              <Specification
                title="Fit"
                value="Regular-fit"
              />

              <Specification
                title="Neck"
                value="Round Neck"
              />

              <Specification
                title="Sleeve"
                value="Half-sleeves"
              />

              <Specification
                title="Style"
                value="Casual Wear"
              />

            </div>

          </div>


          {/* VIDEO */}

          <div className="flex items-center">

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setIsVideoOpen(true)}
              className="
                relative
                w-full
                aspect-video
                rounded-lg
                overflow-hidden
                bg-[#aaa]
                group
              "
            >

              <img
                src={product.image}
                alt=""
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  opacity-80
                  group-hover:scale-105
                  transition-transform
                  duration-500
                "
              />

              <div className="absolute inset-0 bg-black/25" />

              <div
                className="
                  absolute
                  top-4
                  right-5
                  text-white
                  text-xs
                  font-medium
                "
              >
                1:00 M
              </div>


              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                "
              >

                <span
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    group-hover:scale-110
                    transition
                  "
                >
                  <PlayArrowIcon
                    sx={{
                      color: "#333",
                      fontSize: 30,
                    }}
                  />
                </span>

              </div>


              <div
                className="
                  absolute
                  bottom-5
                  left-0
                  right-0
                  text-center
                  text-white
                  text-sm
                  font-medium
                "
              >
                {product.title}
              </div>

            </motion.button>

          </div>

        </div>

      </motion.section>


      {/* ==================================================
          SIMILAR PRODUCTS
      ================================================== */}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        variants={stagger}
        className="
          max-w-[1280px]
          mx-auto
          px-5
          lg:px-8
          pb-24
        "
      >

        <motion.div variants={fadeUp}>
          <SectionTitle>
            Similar Products
          </SectionTitle>
        </motion.div>


        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-x-5
            gap-y-10
            mt-7
          "
        >

          {similarProducts.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
            >
              <ProductCard
                product={item}
                onClick={() => {
                  navigate(`/product/${item.id}`);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              />
            </motion.div>
          ))}

        </div>

      </motion.section>


      {/* ==================================================
          VIDEO MODAL
      ================================================== */}

      <AnimatePresence>

        {isVideoOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[100]
              bg-black/75
              flex
              items-center
              justify-center
              p-5
            "
            onClick={() => setIsVideoOpen(false)}
          >

            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative
                w-full
                max-w-[850px]
                aspect-video
                rounded-xl
                overflow-hidden
                bg-[#222]
              "
            >

              <img
                src={product.image}
                alt={product.title}
                className="
                  w-full
                  h-full
                  object-cover
                  opacity-80
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  pointer-events-none
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    bg-white
                    shadow-lg
                    flex
                    items-center
                    justify-center
                    pointer-events-auto
                    cursor-pointer
                    hover:scale-105
                    transition-transform
                  "
                >
                  <PlayArrowIcon
                    sx={{
                      fontSize: 34,
                      color: "#333",
                    }}
                  />
                </div>
              </div>

              {/* Close Button with high z-index and explicit stopPropagation */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsVideoOpen(false);
                }}
                aria-label="Close video"
                className="
                  absolute
                  top-4
                  right-4
                  z-30
                  w-10
                  h-10
                  rounded-full
                  bg-white
                  text-[#3C4242]
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  hover:scale-110
                  active:scale-95
                  hover:bg-neutral-100
                  transition-all
                  cursor-pointer
                "
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </button>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </main>
  );
}


// ======================================================
// BENEFIT
// ======================================================

function Benefit({ icon, title }) {
  return (
    <div className="flex items-center gap-3">

      <div
        className="
          w-9
          h-9
          rounded-full
          bg-[#f6f6f6]
          flex
          items-center
          justify-center
          text-[#555]
        "
      >
        {React.cloneElement(icon, {
          sx: {
            fontSize: 18,
          },
        })}
      </div>

      <span className="text-xs text-[#555]">
        {title}
      </span>

    </div>
  );
}


// ======================================================
// SECTION TITLE
// ======================================================

function SectionTitle({ children }) {
  return (
    <h2
      className="
        relative
        pl-5
        text-[22px]
        font-semibold
        text-[#383838]
      "
    >

      <span
        className="
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          w-[4px]
          h-[22px]
          rounded-full
          bg-[#8A2BEF]
        "
      />

      {children}

    </h2>
  );
}


// ======================================================
// TAB BUTTON
// ======================================================

function TabButton({
  children,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        pb-3
        text-xs
        whitespace-nowrap
        transition
        ${
          active
            ? "text-[#333] font-medium"
            : "text-[#777] hover:text-[#333]"
        }
      `}
    >

      {children}

      {active && (
        <span
          className="
            absolute
            bottom-[-1px]
            left-0
            right-0
            h-[2px]
            bg-[#333]
          "
        />
      )}

    </button>
  );
}


// ======================================================
// SPECIFICATION
// ======================================================

function Specification({
  title,
  value,
}) {
  return (
    <div
      className="
        min-h-[72px]
        px-5
        py-4
        border-r
        border-b
        border-[#eeeeee]
      "
    >

      <p className="text-[10px] text-[#999] mb-1">
        {title}
      </p>

      <p className="text-xs font-medium text-[#444]">
        {value}
      </p>

    </div>
  );
}


// ======================================================
// PRODUCT CARD
// ======================================================

function ProductCard({
  product,
  onClick,
}) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const favorite = product ? isInWishlist(product.id) : false;

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (product) {
      toggleWishlist(product);
    }
  };


  return (
    <article
      onClick={onClick}
      className="
        group
        cursor-pointer
        min-w-0
      "
    >

      {/* IMAGE */}

      <div
        className="
          relative
          aspect-[0.82]
          rounded-lg
          overflow-hidden
          bg-[#f5f5f5]
        "
      >

        <img
          src={product.image}
          alt={product.title}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-[1.04]
            transition-transform
            duration-500
          "
        />


        {/* FAVORITE */}

        <button
          onClick={toggleFavorite}
          className="
            absolute
            top-3
            right-3
            w-8
            h-8
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            shadow-sm
            hover:scale-105
            transition
          "
        >

          {favorite ? (
            <FavoriteIcon
              sx={{
                fontSize: 17,
                color: "#8A2BEF",
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{
                fontSize: 17,
                color: "#555",
              }}
            />
          )}

        </button>


        {/* NEW */}

        {product.isNew && (
          <span
            className="
              absolute
              left-3
              top-3
              bg-white
              px-2
              py-1
              rounded
              text-[9px]
              font-semibold
            "
          >
            NEW
          </span>
        )}

      </div>


      {/* INFO */}

      <div className="pt-3">

        <div className="flex items-start justify-between gap-2">

          <h3
            className="
              text-[13px]
              font-medium
              text-[#333]
              truncate
            "
          >
            {product.title}
          </h3>

          <span
            className="
              shrink-0
              bg-[#f6f6f6]
              rounded
              px-2
              py-1
              text-[10px]
              font-semibold
            "
          >
            ${Number(product.price).toFixed(2)}
          </span>

        </div>

        <p
          className="
            text-[10px]
            text-[#999]
            mt-1
            truncate
          "
        >
          {product.brand}
        </p>

      </div>

    </article>
  );
}