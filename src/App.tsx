import { RouterProvider } from 'react-router-dom'
import './App.scss'
import './styles/main.scss'
import { router } from './routes/route'
function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
