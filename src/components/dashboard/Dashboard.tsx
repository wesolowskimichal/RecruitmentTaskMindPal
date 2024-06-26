import { useCallback, useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Notification } from '@/types/Types'
import NotificationIcon from '@assets/notification-icon.svg'
import { v4 as uuidv4 } from 'uuid'
import { useNotification } from '@/context/NotificationContext'
import { FileToBase64 } from '@helpers/FileToBase64'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import classNames from 'classnames'

export const Dashboard = () => {
  const { addNotification } = useNotification()
  const [type, setType] = useState<Notification['type']>('NewFeature')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value as Notification['type'])
  }

  useEffect(() => {
    if (!isDrawerOpen) {
      setType('NewFeature')
      setImage(null)
      setImagePreview(null)
      setMessage('')
    }
  }, [isDrawerOpen])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setImage(file)
      const objectUrl = URL.createObjectURL(file)
      setImagePreview(objectUrl)

      return () => {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const handleAddNotification = useCallback(async () => {
    let imageBase64 = NotificationIcon
    if (image) {
      imageBase64 = await FileToBase64(image)
    }

    const notification = {
      id: uuidv4(),
      type: type,
      isRead: false,
      image: imageBase64,
      message: message,
      createdAt: new Date()
    }

    addNotification(notification)
  }, [type, image, message])

  return (
    <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <DrawerTrigger className={styles.DrawerTrigger} onClick={() => setIsDrawerOpen(true)}>
        Add Notification
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className={styles.DrawerTitle}>Add Notification</DrawerTitle>
          <DrawerDescription>Dashboard to add notification</DrawerDescription>
          <>
            <div className={styles.Ui}>
              <div className={styles.UiElement}>
                <h2>Notification Type</h2>
                <input
                  type="checkbox"
                  id="request"
                  name="type"
                  value="Request"
                  checked={type === 'Request'}
                  onChange={handleTypeChange}
                />
                <label htmlFor="request">Request</label>

                <input
                  type="checkbox"
                  id="statusChangeToOnHold"
                  name="type"
                  value="StatusChangeToOnHold"
                  checked={type === 'StatusChangeToOnHold'}
                  onChange={handleTypeChange}
                />
                <label htmlFor="statusChangeToOnHold">Status Change To On Hold</label>

                <input
                  type="checkbox"
                  id="newFeature"
                  name="type"
                  value="NewFeature"
                  checked={type === 'NewFeature'}
                  onChange={handleTypeChange}
                />
                <label htmlFor="newFeature">New Feature</label>
              </div>
              <div className={styles.UiElement}>
                <h2>Message</h2>
                <textarea value={message} onChange={handleMessageChange} />
              </div>
              <div className={classNames(styles.UiElement, styles.ImageUpload)}>
                <h2>Image</h2>
                <img src={imagePreview ?? NotificationIcon} alt="Notification image" />
                <label htmlFor="file-upload" className={styles.FileUploadButton}>
                  Select
                </label>
                <input id="file-upload" type="file" onChange={handleImageChange} />
              </div>
            </div>
          </>
        </DrawerHeader>
        <DrawerFooter
          onClick={() => {
            handleAddNotification()
            setIsDrawerOpen(false)
          }}
          className={styles.DrawerSubmit}
        >
          Submit
        </DrawerFooter>
        <DrawerClose onClick={() => setIsDrawerOpen(false)}>Cancel</DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}
