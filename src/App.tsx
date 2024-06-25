import { RouterProvider } from 'react-router-dom'
import { NotificationContextProvider } from '@context/NotificationContext'
import { router } from './router'

function App() {
  return (
    <NotificationContextProvider>
      <RouterProvider router={router} />
    </NotificationContextProvider>
  )
}

export default App
