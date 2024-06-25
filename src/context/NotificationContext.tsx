import { ReactNode, createContext, useEffect, useState, FC, useContext } from 'react'
import { Notification } from '@types/Types'

type NotificationContextType = {
  notifications: Notification[]
  markAllAsRead: () => void
  markAsReadById: (id: string) => void
  getById: (id: string) => Notification | null
  addNotification: (notification: Notification) => void
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  markAllAsRead: () => {},
  markAsReadById: (id: string) => {},
  getById: (id: string) => null,
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

  const getById = (id: string): Notification | null => {
    return notifications.find(notification => notification.id === id) ?? null
  }

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev])
  }

  return (
    <NotificationContext.Provider value={{ notifications, markAllAsRead, markAsReadById, getById, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)

export default NotificationContext
