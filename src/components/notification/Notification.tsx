import { useNavigate } from 'react-router-dom'
import { useNotification } from '@/context/NotificationContext'
import { DateToReadableFormat } from '@helpers/DateToReadableFormat'
import { Notification as NotificationType } from '@types/Types'
import styles from './Notification.module.scss'
import classNames from 'classnames'

type NotificationProps = {
  notification: NotificationType
}
export const Notification = ({ notification }: NotificationProps) => {
  const { markAsReadById } = useNotification()
  const navigate = useNavigate()

  const handleOnNotificationClick = () => {
    markAsReadById(notification.id)
    navigate(`/notification/${notification.id}`)
  }

  return (
    <button
      onClick={() => handleOnNotificationClick()}
      className={classNames(styles.Notification, {
        [styles.Unread]: !notification.isRead
      })}
    >
      <img src={notification.image} alt="Notification's image" />
      <div className={styles.NotificationContentWrapper}>
        <p className={styles.NotificationMessage}>{notification.message}</p>
        <p className={styles.NotificationDate}>{DateToReadableFormat(notification.createdAt)}</p>
      </div>
      {!notification.isRead && (
        <span
          className={styles.MarkAsReadButton}
          onClick={e => {
            e.stopPropagation()
            markAsReadById(notification.id)
          }}
        ></span>
      )}
    </button>
  )
}
