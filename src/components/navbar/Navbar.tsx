import { useState } from 'react'
import styles from './Navbar.module.scss'
import bellIcon from '../../assets/bell-icon.svg'
import { NotificationsModal } from '../notificationsModal/NotificationsModal'

export const Navbar = () => {
  const [notificationsCount, setNotificationsCount] = useState(0)
  const [isNotificationsModalVisible, setIsNotificationsModalVisible] = useState(false)
  const [isNotificationsButtonOnHover, setIsNotificationsButtonOnHover] = useState(false)

  return (
    <header className={styles.Navbar}>
      <h1>Michał Wesołowski</h1>
      <div className={styles.Notifications}>
        <button
          onClick={() => setIsNotificationsModalVisible(prev => !prev)}
          onMouseEnter={() => setIsNotificationsButtonOnHover(true)}
          onMouseLeave={() => setIsNotificationsButtonOnHover(false)}
        >
          <img src={bellIcon} alt="Notifications" />
        </button>
        {isNotificationsModalVisible ? (
          <NotificationsModal />
        ) : (
          <span
            className={`${styles.NotificationsCount} ${
              isNotificationsButtonOnHover ? styles.NotificationsCountHover : ''
            }`}
          >
            {notificationsCount}
          </span>
        )}
      </div>
    </header>
  )
}
