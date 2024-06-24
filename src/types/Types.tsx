export type Notification = {
  id: string
  type: 'Request' | 'StatusChangeToOnHold' | 'NewFeature'
  isRead: boolean
  image: string
  message: string
  createdAt: Date
}

export type NotificationModalType = 'all' | 'unread'
