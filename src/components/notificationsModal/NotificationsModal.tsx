import { useMemo, useState } from 'react'
import styles from './NotificationsModal.module.scss'
import markAllIcon from '../../assets/mark-all-icon.svg'
import { NotificationModalType } from '../../types/Types'
import { Notification as NotificationView } from '../notification/Notification'
import { useNotification } from '../../context/NotificationContext'

type NotificationsModalProps = {
  notificationsCount: number
}

export const NotificationsModal = ({ notificationsCount }: NotificationsModalProps) => {
  const { notifications, markAllAsRead } = useNotification()
  const [section, setSection] = useState<NotificationModalType>('all')

  const notificationsToShow = useMemo(() => {
    return section === 'all' ? notifications : notifications.filter(notification => !notification.isRead)
  }, [notifications, section])

  return (
    <div className={styles.Wrapper}>
      <header className={styles.NotificationsHeader}>
        <p className={styles.NotificationsHeaderInfo}>
          Notifications <span className={styles.NotificationsCount}>{notificationsCount}</span>
        </p>
        <nav className={styles.SectionButtonsContainer}>
          <button
            className={`${styles.SectionButton} ${section === 'all' && styles.CurrentSectionButton}`}
            onClick={() => setSection('all')}
          >
            All Notifications
          </button>
          <button
            className={`${styles.SectionButton} ${section === 'unread' && styles.CurrentSectionButton}`}
            onClick={() => setSection('unread')}
          >
            Unread Notifications
          </button>
          <button className={`${styles.SectionButton} ${styles.MarkButton}`} onClick={() => markAllAsRead()}>
            <img src={markAllIcon} alt="Mark all as read" /> Mark all as read
          </button>
        </nav>
      </header>
      <div className={styles.Content}>
        {notificationsToShow.map((notification, index) => (
          <NotificationView key={index} notification={notification} />
        ))}
      </div>
    </div>
  )
}
