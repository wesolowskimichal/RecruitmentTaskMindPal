import { useParams } from 'react-router-dom'
import { Notification as NotificationType } from '../../types/Types'
import { Page } from '../page/Page'
import { useEffect, useState } from 'react'
import { useNotification } from '../../context/NotificationContext'

type NotificationUrlParams = {
  id: NotificationType['id']
}

export const Notification = () => {
  const { id } = useParams<NotificationUrlParams>()
  const { getById } = useNotification()
  const [notification, setNotification] = useState<NotificationType | null>(null)

  useEffect(() => {
    if (id) {
      const notificationData = getById(id)
      setNotification(notificationData)
    }
  }, [id, getById])

  return <Page title={`Notification ${notification?.type}`}>{notification && <h1>{notification.type}</h1>}</Page>
}
