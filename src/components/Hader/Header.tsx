import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdTaskAlt } from "react-icons/md";
import {FaSignOutAlt } from "react-icons/fa";

const Header: FC = () => {
  const isAuth = true
  return (
    <header className='header'>
        <Link className='header__logo--white' to= "/" >
        <MdTaskAlt size = {40}/>
        </Link>
        {
          isAuth && (
            <nav className='header__nav'>
              <ul className="header__ul">
              <li className='header__li'>
                    <NavLink className={({isActive}) => isActive ? "header__Navlink--active" : "header__NavLink"} to={'/'}>Home</NavLink>
                </li>
                <li className='header__li'>
                    <NavLink className={({isActive}) => isActive ? "header__Navlink--active" : "header__NavLink"} to={'/categories'}>Categories</NavLink>
                </li>
                <li className='header__li'>
                    <NavLink className={({isActive}) => isActive ? "header__Navlink--active" : "header__NavLink"} to={'/problems'}>Problems</NavLink>
                </li>
              </ul>
            </nav>
          )
        }

        {
          isAuth ? (
            <button className='btn btn-red'>
              <span>Log Out</span>
              <FaSignOutAlt />
            </button>
          ) : (
            <Link className='header__login header__login:hover' to={'auth'}>
              Log In / Sign In
            </Link>
          )
        }
    </header>
  )
}

export default Header