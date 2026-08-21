import React from "react";
import "../Cards/ProductCard.css";
import topSellingData from "../../data/topSelling.json";
import ViewBtn from "../ViewBtn/ViewBtn";
import { Link } from "react-router-dom";

const TopSelling = () => {
  return (
    <section className="product_section">
      <h2 className="section_heading">TOP SELLING</h2>

      <div className="product_grid">
        {topSellingData.map((item, index) => {
          // ID verify karein
          const productId = item.id || (51 + index);

          return (
            <Link 
              to={`/product/${productId}`} 
              key={productId} 
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="product_card">
                <div className="card_img_wrapper">
                  <img src={item.image} alt={item.name} />
                </div>
                <h3 className="product_title">{item.name}</h3>
                <div className="product_rating">
                  <span className="stars">★★★★☆</span>
                  <span className="rating_num">{item.rating}/5</span>
                </div>
                <div className="product_price_box">
                  <span className="current_price">${item.price}</span>
                  {item.oldPrice && <span className="old_price">${item.oldPrice}</span>}
                  {item.discount && <span className="discount_badge">{item.discount}</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <ViewBtn />
    </section>
  );
};

export default TopSelling;