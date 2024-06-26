import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './NotificationsModal.module.scss'
import markAllIcon from '@assets/mark-all-icon.svg'
import { NotificationModalType } from '@/types/Types'
import { Notification as NotificationView } from '@components/notification/'
import { useNotification } from '@/context/NotificationContext'

type NotificationsModalProps = {
  notificationsCount: number
}

export const NotificationsModal = ({ notificationsCount }: NotificationsModalProps) => {
  const { notifications, markAllAsRead } = useNotification()
  const [section, setSection] = useState<NotificationModalType>('all')
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
    }
  }, [headerRef.current?.offsetHeight])

  const notificationsToShow = useMemo(() => {
    return section === 'all' ? notifications : notifications.filter(notification => !notification.isRead)
  }, [notifications, section])

  const getNotificationsCount = useMemo(
    () => (notificationsCount > 99 ? '99+' : notificationsCount),
    [notificationsCount]
  )

  return (
    <div className={styles.Wrapper}>
      <header className={styles.NotificationsHeader} ref={headerRef}>
        <p className={styles.NotificationsHeaderInfo}>
          Notifications <span className={styles.NotificationsCount}>{getNotificationsCount}</span>
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
