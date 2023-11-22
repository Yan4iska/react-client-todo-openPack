import { FC } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Hader/Header"

const Layout: FC = () => {
  return (
    <div className="layout">
        <Header/>
        <div className="container">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout