import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import productsData from "../../data/product.json";
import topSellingData from "../../data/topSelling.json";
import "./CategoryPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'


const CategoryPage = () => {
    const { categoryName } = useParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const pageTitle = categoryName
        ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
        : "Casual";

    const allProducts = [...(productsData || []), ...(topSellingData || [])];

    return (
        <div className="category_page">
            <div className="breadcrumb">
                <span>Home</span> &gt; <span className="current">{pageTitle}</span>
            </div>

            <div className="category_container">
                {/* Mobile Filters Modal Overlay */}
                <aside className={`filters_sidebar ${isFilterOpen ? "open" : ""}`}>
                    <div className="filter_header">
                        <h3>Filters</h3>
                        {/* Mobile close button */}
                        <span className="close_btn" onClick={() => setIsFilterOpen(false)}>✕</span>
                    </div>
                    <hr />

                    <ul className="category_list">
                        <li>T-shirts <span>›</span></li>
                        <li>Shorts <span>›</span></li>
                        <li>Shirts <span>›</span></li>
                        <li>Hoodies <span>›</span></li>
                        <li>Jeans <span>›</span></li>
                    </ul>
                    <hr />

                    <div className="filter_section">
                        <h4>Price</h4>
                        <input type="range" min="50" max="200" className="price_range" />
                        <div className="price_labels">
                            <span>$50</span>
                            <span>$200</span>
                        </div>
                    </div>
                    <hr />

                    <div className="filter_section">
                        <h4>Colors</h4>
                        <div className="color_options">
                            <span className="color_circle green"></span>
                            <span className="color_circle red"></span>
                            <span className="color_circle yellow"></span>
                            <span className="color_circle orange"></span>
                            <span className="color_circle cyan"></span>
                            <span className="color_circle blue"></span>
                            <span className="color_circle purple"></span>
                            <span className="color_circle pink"></span>
                            <span className="color_circle white"></span>
                            <span className="color_circle black"></span>
                        </div>
                    </div>
                    <hr />

                    <div className="filter_section">
                        <h4>Size</h4>
                        <div className="size_badges">
                            <span className="size_btn">XX-Small</span>
                            <span className="size_btn">X-Small</span>
                            <span className="size_btn">Small</span>
                            <span className="size_btn">Medium</span>
                            <span className="size_btn active">Large</span>
                            <span className="size_btn">X-Large</span>
                        </div>
                    </div>
                    <hr />

                    <button className="apply_filter_btn" onClick={() => setIsFilterOpen(false)}>
                        Apply Filter
                    </button>
                </aside>

                {/* Backdrop for closing modal when clicked outside */}
                {isFilterOpen && <div className="filter_backdrop" onClick={() => setIsFilterOpen(false)}></div>}

                {/* Right Products Content */}
                <main className="category_content">
                    <div className="content_header">
                        <h2>{pageTitle}</h2>
                        <div className="sorting_info">
                            <span className="showing_text">Showing 1-10 of 100 Products</span>

                            {/* Mobile Filter Toggle Button */}
                            <button className="mobile_filter_icon" onClick={() => setIsFilterOpen(true)}>
                                <span><FontAwesomeIcon icon={faFilter} /></span>
                            </button>
                        </div>
                    </div>

                    <div className="shop_product_grid">
                        {allProducts.map((item, index) => (
                            <Link
                                to={`/product/${item.id ?? index + 1}`}
                                key={item.id ?? index}
                                style={{ textDecoration: 'none', color: 'inherit' }}
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
                </main>
            </div>
        </div>
    );
};

export default CategoryPage;