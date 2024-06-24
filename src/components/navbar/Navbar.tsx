import { useEffect, useMemo, useState } from 'react'
import styles from './Navbar.module.scss'
import bellIcon from '../../assets/bell-icon.svg'
import { NotificationsModal } from '../notificationsModal/NotificationsModal'
import { useNotification } from '../../context/NotificationContext'

export const Navbar = () => {
  const { notifications } = useNotification()
  const [notificationsCount, setNotificationsCount] = useState(notifications.length)
  const [isNotificationsModalVisible, setIsNotificationsModalVisible] = useState(false)
  const [isNotificationsButtonOnHover, setIsNotificationsButtonOnHover] = useState(false)

  const getUnreadNotificationsCount: number = useMemo(() => {
    return notifications.filter(notification => !notification.isRead).length
  }, [notifications])

  useEffect(() => {
    setNotificationsCount(getUnreadNotificationsCount)
  }, [notifications, getUnreadNotificationsCount])

  return (
    <header className={styles.Navbar}>
      <h1>Michał Wesołowski</h1>
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
            {notificationsCount}
          </span>
        )}
      </div>
    </header>
  )
}
