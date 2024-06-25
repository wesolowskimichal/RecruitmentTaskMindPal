import { Dashboard } from '../../components/dashboard/Dashboard'
import { Page } from '@/pages/page'
import styles from './Home.module.scss'

export const Home = () => {
  return (
    <Page title="Home">
      <div className={styles.Wrapper}>
        <Dashboard />
      </div>
    </Page>
  )
}
