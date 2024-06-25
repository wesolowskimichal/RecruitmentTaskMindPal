import { useEffect, useMemo, useState } from 'react'
import { NotificationsModal } from '@components/notificationsModal'
import { useNotification } from '@/context/NotificationContext'
import bellIcon from '@assets/bell-icon.svg'
import styles from './Navbar.module.scss'

export const Navbar = () => {
  const { notifications } = useNotification()
  const [notificationsCount, setNotificationsCount] = useState(notifications.length)
  const [isNotificationsModalVisible, setIsNotificationsModalVisible] = useState(false)
  const [isNotificationsButtonOnHover, setIsNotificationsButtonOnHover] = useState(false)

  const getUnreadNotificationsCount: number = useMemo(() => {
    return notifications.filter(notification => !notification.isRead).length
  }, [notifications])

  const getNotificationsCount = useMemo(
    () => (notificationsCount > 99 ? '99+' : notificationsCount),
    [notificationsCount]
  )

  useEffect(() => {
    setNotificationsCount(getUnreadNotificationsCount)
  }, [notifications, getUnreadNotificationsCount])

  return (
    <header className={styles.Navbar}>
      <h1>
        <a href="/">Michał Wesołowski</a>
      </h1>
      <div className={styles.Notifications}>
        <button
          className={styles.NotificationButton}
          onClick={() => setIsNotificationsModalVisible(prev => !prev)}
          onMouseEnter={() => setIsNotificationsButtonOnHover(true)}
          onMouseLeave={() => setIsNotificationsButtonOnHover(false)}
        >
          <img src={bellIcon} alt="Notifications" />
        </button>
        {isNotificationsModalVisible ? (
          <NotificationsModal notificationsCount={notificationsCount} />
        ) : (
          <span
            className={`${styles.NotificationsCount} ${isNotificationsButtonOnHover && styles.NotificationsCountHover}`}
          >
            {getNotificationsCount}
          </span>
        )}
      </div>
    </header>
  )
}

export default Navbar
