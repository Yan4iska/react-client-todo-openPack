import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MdTaskAlt } from "react-icons/md";
import {FaSignOutAlt } from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../../helper/localstorage.helper';
import { toast } from 'react-toastify'

const Header: FC = () => {
  const isAuth = useAuth()
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const logoutHandler = ()=>{
    dispatch(logout())
    removeTokenFromLocalStorage('token')
    toast.success('You lagged out.')
    navigate('/')
  }
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
            <button className='btn btn-red' onClick={logoutHandler}>
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