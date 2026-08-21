import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import productsData from "../../data/product.json";
import topProductsData from "../../data/topSelling.json";
import ProductTabs from "../ProductTabs/ProductTabs";
import Cards from "../Cards/Cards";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Color options Array
  const colors = ["#4F533E", "#2D4030", "#31344F"];
  const colorNames = ["Olive", "Teal", "Navy"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];

  // Interactive States
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);

  // Merge JSON Data
  const allProducts = [...productsData, ...topProductsData];
  const product = allProducts.find((p) => String(p.id) === String(id));

  const [mainImage, setMainImage] = useState(product?.image);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Product Not Found!</h2>
      </div>
    );
  }

  const thumbnails = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    // Context + LocalStorage main Save karein
    addToCart(product, quantity, selectedSize, colorNames[selectedColor]);
    // Cart Page redirect
    navigate("/cart");
  };

  return (
    <div className="product_detail_page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Shop</span> &gt; <span className="current">{product.name}</span>
      </div>

      <div className="product_main_section">
        {/* Left: Thumbnail Gallery */}
        <div className="gallery_container">
          <div className="thumbnail_list">
            {thumbnails.map((img, idx) => (
              <div
                key={idx}
                className={`thumb_box ${(mainImage || product.image) === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt="thumbnail" />
              </div>
            ))}
          </div>

          <div className="main_image_box">
            <img src={mainImage || product.image} alt={product.name} />
          </div>
        </div>

        {/* Right: Info & Selectors */}
        <div className="info_container">
          <h1 className="product_name">{product.name}</h1>
          
          <div className="rating_box">
            <span className="stars">★★★★☆</span>
            <span className="rating_score">{product.rating || "4.5"}/5</span>
          </div>

          <div className="price_box">
            <span className="current_price">${product.price}</span>
            {product.oldPrice && <span className="old_price">${product.oldPrice}</span>}
            {product.discount && <span className="discount_badge">{product.discount}</span>}
          </div>

          <p className="product_description">
            High quality custom fitted apparel made for daily style and ultimate comfort.
          </p>

          <hr />

          {/* Color Selector */}
          <div className="option_section">
            <span className="option_label">Select Colors</span>
            <div className="color_picker">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`color_dot ${selectedColor === index ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(index)}
                >
                  {selectedColor === index && <span className="check_icon">✓</span>}
                </div>
              ))}
            </div>
          </div>

          <hr />

          {/* Size Selector */}
          <div className="option_section">
            <span className="option_label">Choose Size</span>
            <div className="size_picker">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size_btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr />

          {/* Actions: Quantity + Add To Cart */}
          <div className="action_row">
            <div className="quantity_selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button className="add_to_cart_btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <ProductTabs />
      <Cards title="YOU MIGHT ALSO LIKE" />
    </div>
  );
};

export default ProductDetail;