import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
// import App from './pages/app/App.tsx'
// import { Auth } from './pages/auth/Auth.tsx'
import { ThemeProvider } from './context/themeContext.tsx'
import './index.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = lazy(() => import('./pages/app/App.tsx'))
const Auth = lazy(() => import('./pages/auth/Auth.tsx'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} />
      <Route path='auth' element={<Auth />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
