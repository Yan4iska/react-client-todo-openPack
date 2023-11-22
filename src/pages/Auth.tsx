import { FC, useState } from "react"
import { AuthService } from "../services/auth.service"
import { toast } from "react-toastify"

const Auth: FC = () => {
  const [email, setEmail] = useState('')
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [password, setPassword] = useState('')

  const loginHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    try{
      
      
    } catch (err: any){
      const error = err.responce ?. data.message
      toast.error(error.toString())
    }
  }

  const registrationHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault()
      const data = await AuthService.registration({ email, password })
      if(data) {
        toast.success('Account has been created!')
        setIsLogin(!isLogin)
//
      }
    }catch (err: any){
      const error = err.responce ?. data.message
      toast.error(error.toString())
    }
  }

  return (
    <div className="auth">
      <h1 className="auth__h1">
        {
          isLogin ? 'Login' : 'Registration'
        }
      </h1>
      <form 
      onSubmit={isLogin ? loginHandler : registrationHandler}
      action="" className="auth__form">
      <input type="text" className="input" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
      <input type="password" className="input" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
        <button className="btn btn-green">Submit</button>
      </form>

      <div className="registration">
        {isLogin ? (
        <button
          onClick={()=>setIsLogin(!isLogin)}
          className="btnLinks">
          You don't have an account?
        </button>
        ) : (
          <button 
          onClick={()=>setIsLogin(!isLogin)}
          className="btnLinks">
          Already have an account?
        </button>
        )}
      </div>
    </div>
  )
}

export default Auth