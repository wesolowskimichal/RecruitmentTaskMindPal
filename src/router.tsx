import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Notification } from './pages/notification/Notification'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/notification/:type/:id', element: <Notification /> }
])
