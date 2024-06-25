import { Page } from '@/pages/page'
import styles from './NotFound.module.scss'

export const NotFound = () => {
  return (
    <Page title="Not found">
      <h1 className={styles.Header}>404 - Page not found</h1>
      <h3>Sorry, the page you are looking for could not be found.</h3>
    </Page>
  )
}
