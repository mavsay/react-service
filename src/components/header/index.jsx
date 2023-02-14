import React from 'react'

import './header.css';
// import '../../font/stylesheet,css'

const Header = () => {
  return (
    <div className='header_wrapper'>
      <div className="header_container">
        <nav className="header_nav">
          <a href="#" className="nav_item">brands</a>
          <a href="#" className="nav_item">models</a>
          <a href="#" className="nav_item">services</a>
        </nav>
        <form action="" className="header_form">
          <div className="search_block">
            <input type="search" placeholder='введите запрос' className='input_search'/>
            <input type="submit" value="search" className='header_input_submit'/>
          </div>
        </form>
        <div className="header_burger">
          <div className="burger_block">
            <span className='burger_menu'>menu</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;