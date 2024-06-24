import { useState } from 'react'
import styles from './NotificationsModal.module.scss'

export const NotificationsModal = () => {
  const [section, setSection] = useState<'all' | 'unread'>('all')

  return <div className={styles.Wrapper}>hello</div>
}
