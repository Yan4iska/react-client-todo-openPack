import  { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'
import img from '../../assets/errorSecurity.jpeg'

interface Props{
    children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({children}) => {
    const isAuth = useAuth()
  return <>
    {isAuth ? children : <div className='protect'>
        <h1 className='protect__h1'>
          To view this page you must be logged in!
        </h1>
        <img className="protect__img" src="img" alt="img" />
      </div>}
  </>
}
export default ProtectedRoute