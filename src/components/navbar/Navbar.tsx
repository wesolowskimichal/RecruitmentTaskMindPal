import { useEffect, useMemo, useState } from 'react'
import { NotificationsModal } from '@components/notificationsModal'
import { useNotification } from '@/context/NotificationContext'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
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
      <Popover>
        <div className={styles.Notifications}>
          <PopoverTrigger
            className={styles.NotificationButton}
            onClick={() => setIsNotificationsModalVisible(prev => !prev)}
            onMouseEnter={() => setIsNotificationsButtonOnHover(true)}
            onMouseLeave={() => setIsNotificationsButtonOnHover(false)}
          >
            <img src={bellIcon} alt="Notifications" />
            {notificationsCount > 0 && (
              <span
                className={`${styles.NotificationsCount} ${
                  isNotificationsButtonOnHover && styles.NotificationsCountHover
                }`}
              >
                {getNotificationsCount}
              </span>
            )}
          </PopoverTrigger>
          <PopoverContent align="end" className={styles.PopoverContent}>
            <NotificationsModal notificationsCount={notificationsCount} />
          </PopoverContent>
        </div>
      </Popover>
    </header>
  )
}
