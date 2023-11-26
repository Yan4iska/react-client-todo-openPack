import { RouterProvider, useActionData } from 'react-router-dom'
import './App.scss'
import './styles/main.scss'
import { router } from './routes/route'
import { useAppDispatch } from './store/hooks'
import { getTokenFromStorage } from './helper/localstorage.helper'
import { AuthService } from './services/auth.service'
import { login, logout } from './store/user/userSlice'
import { useEffect } from 'react'
function App() {
  const dispatch = useAppDispatch()
  const checkAuth =async () => {
    const token = getTokenFromStorage()
    try{
      if(token){
        const data = await AuthService.getMe()
        
        if(data) {
          dispatch(login(data))
        }
        else{
          dispatch(logout())
        }
      }
    } catch(err) {
        console.log(err)
    }
    }
  
    useEffect(()=>{
      checkAuth()
    }, [])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
