import { ReactNode, createContext, useEffect, useState, FC, useContext } from 'react'
import { Notification } from '../types/Types'

type NotificationContextType = {
  notifications: Notification[]
  markAllAsRead: () => void
  markAsReadById: (id: string) => void
  addNotification: (notification: Notification) => void
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  markAllAsRead: () => {},
  markAsReadById: (id: string) => {},
  addNotification: (notification: Notification) => {}
})

const getLocalNotifications = (): Notification[] => {
  const localNotifications = localStorage.getItem('notifications')
  return localNotifications ? JSON.parse(localNotifications) : []
}

const saveLocalNotifications = (notifications: Notification[]) => {
  localStorage.setItem('notifications', JSON.stringify(notifications))
}

export const NotificationContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(getLocalNotifications)

  useEffect(() => {
    saveLocalNotifications(notifications)
  }, [notifications])

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })))
  }

  const markAsReadById = (id: string) => {
    setNotifications(prev =>
      prev.map(notification => (notification.id === id ? { ...notification, isRead: true } : notification))
    )
  }

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [...prev, notification])
  }

  return (
    <NotificationContext.Provider value={{ notifications, markAllAsRead, markAsReadById, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)

export default NotificationContext
