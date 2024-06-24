import { Dispatch, SetStateAction, useState } from 'react'
import styles from './NotificationsModal.module.scss'
import markAllIcon from '../../assets/mark-all-icon.svg'

type NotificationsModalProps = {
  notificationsCount: number
  setNotificationsCount: Dispatch<SetStateAction<number>>
}

export const NotificationsModal = ({ notificationsCount, setNotificationsCount }: NotificationsModalProps) => {
  const [section, setSection] = useState<'all' | 'unread'>('all')

  return (
    <div className={styles.Wrapper}>
      <header className={styles.NotificationsHeader}>
        <p className={styles.NotificationsHeaderInfo}>
          Notifications <span className={styles.NotificationsCount}>{notificationsCount}</span>
        </p>
        <nav className={styles.SectionButtonsContainer}>
          <button className={`${styles.SectionButton} ${section === 'all' && styles.CurrentSectionButton}`}>
            All Notifications
          </button>
          <button className={`${styles.SectionButton} ${section === 'unread' && styles.CurrentSectionButton}`}>
            Unread Notifications
          </button>
          <button className={`${styles.SectionButton} ${styles.MarkButton}`}>
            <img src={markAllIcon} alt="Mark all as read" /> Mark all as read
          </button>
        </nav>
      </header>
    </div>
  )
}
