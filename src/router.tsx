import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Notification } from './pages/notification/Notification'
import { NotFound } from './pages/notFound/NotFound'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/notification/:id', element: <Notification /> },
  { path: '*', element: <NotFound /> }
])
