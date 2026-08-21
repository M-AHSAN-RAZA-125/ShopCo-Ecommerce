import React from 'react'
import './Nav.css'
import nav_logo from '../../assets/nav_logo.png'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext' // 1. Context Hook Import

// Font Awesome Icons link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
  const { cart } = useCart(); // 2. Cart items extract karein

  // 3. Total items quantity calculate karein
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className='Nav'>
      <div className='nav_div nav_logo'>
        <Link to='/'><img src={nav_logo} alt="Our Logo" /></Link>
      </div>

      <div className="nav_div nav_list">
        <FontAwesomeIcon className="nav_menu_icon" icon={faBars}></FontAwesomeIcon>
        <ul className='nav_items'>
          <li><Link className='nav_link' to='/'>Shop</Link></li>
          <li><Link className='nav_link' to='/'>On Sale</Link></li>
          <li><Link className='nav_link' to='/'>New Arrivals</Link></li>
          <li><Link className='nav_link' to='/'>Brands</Link></li>
        </ul>
      </div>

      <div className="nav_div nav_search">
        <input type="search" className='nav_input' placeholder='Search for products...' />
      </div>

      <div className="nav_div nav_icons">
        {/* Nav Cart Icon with Badge */}
        <Link className='nav_link cart_icon_wrapper' to={"/cart"}>
          <FontAwesomeIcon className='nav_icon' icon={faCartShopping} />
          {totalItems > 0 && <span className="cart_badge">{totalItems}</span>}
        </Link>

        {/* Nav Login Icon */}
        <Link className='nav_link' to="/login">
          <FontAwesomeIcon className='nav_icon' icon={faCircleUser} />
        </Link>
      </div>
    </nav>
  )
}

export default Nav;