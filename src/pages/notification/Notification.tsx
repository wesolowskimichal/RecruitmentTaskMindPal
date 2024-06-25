import { useParams } from 'react-router-dom'
import { Notification as NotificationType } from '@/types/Types'
import { Page } from '@pages/page'
import { useEffect, useState } from 'react'
import { useNotification } from '@context/NotificationContext'
import { DateToReadableFormat } from '@helpers/DateToReadableFormat'
import styles from './Notification.module.scss'

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

  return (
    <Page title={`Notification ${notification?.type}`}>
      {notification && (
        <div className={styles.Notification}>
          <h1>{notification.type}</h1>
          <p>{notification.message}</p>
          <p>{DateToReadableFormat(notification.createdAt)}</p>
        </div>
      )}
    </Page>
  )
}
