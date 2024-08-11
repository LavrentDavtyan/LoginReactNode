// 


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/Home.jsx'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'


const routes = createBrowserRouter([
  {
    path:'',
    element: <Home/>,
    children: [
      {
        path:'login',
        element: <Login/>,
      },
      {
        path:'profile',
        element: <Profile/>,
      },
 
    ]
  }, 
  // {
  //   path:'contacts',
  //   element:<h1>Contacts</h1>
  // }
])


createRoot(document.getElementById('root')).render(
    <StrictMode >
      <RouterProvider router={routes}>
         <App />
      </RouterProvider>
    </StrictMode>,
)
