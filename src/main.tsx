import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { ThemeProvider } from './context/themeContext.tsx'
import { Loader } from './components/index.ts'
import { ToastContainer } from 'react-toastify'
import { ErrorPage } from './pages/error/error-page.tsx'
import 'react-toastify/dist/ReactToastify.css'

import './index.scss'

const App = lazy(() => import('./pages/app/App.tsx'))
const Auth = lazy(() => import('./pages/auth/Auth.tsx'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} errorElement={<ErrorPage />} />
      <Route path='auth' element={<Auth />} errorElement={<ErrorPage />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
)
