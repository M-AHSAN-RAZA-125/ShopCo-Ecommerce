import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import productsData from "../../data/product.json";
import ViewBtn from "../ViewBtn/ViewBtn";

// 1. Component me 'title' prop pass kiya (default value: "NEW ARRIVALS")
const Cards = ({ title = "NEW ARRIVALS" }) => {
    return (
        <section className="product_section">
            {/* 2. Dynamic Title Render Karein */}
            <h2 className="section_heading">{title}</h2>

            <div className="product_grid">
                {productsData.map((item, index) => (
                    <Link
                        to={`/product/${item.id || index}`}
                        key={item.id || index}
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
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <ViewBtn />
        </section>
    );
};

export default Cards;