import { FC } from "react"
import img from '../assets/error.png'
import {Link} from 'react-router-dom'
const ErrorPage: FC = () => {
  return (
    <div className="errorPage">
      <img src={img} alt="img"/>
      <Link to = {'/'} className="btn errorPage__btn">RETURN</Link>
    </div>
  )
}

export default ErrorPage