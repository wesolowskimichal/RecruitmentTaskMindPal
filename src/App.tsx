import { Navbar } from './components/navbar/Navbar'
import { Ui } from './components/ui/Ui'
import { NotificationContextProvider } from './context/NotificationContext'

function App() {
  return (
    <NotificationContextProvider>
      <>
        <Navbar />
        <Ui />
      </>
    </NotificationContextProvider>
  )
}

export default App
