import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Notification } from '@components/notification'
import { useNotification } from '@/context/NotificationContext'
import { useNavigate } from 'react-router-dom'
import { DateToReadableFormat } from '@/helpers/DateToReadableFormat'
import { Notification as NotificationType } from '@/types/Types'

jest.mock('@/context/NotificationContext', () => ({
  useNotification: jest.fn()
}))

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

jest.mock('@/helpers/DateToReadableFormat', () => ({
  DateToReadableFormat: jest.fn()
}))

describe('Notification Component', () => {
  const mockMarkAsReadById = jest.fn()
  const mockNavigate = jest.fn()
  const getYesterDayDate = () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return date
  }
  const mockNotification: NotificationType = {
    id: '1',
    image: 'https://via.placeholder.com/150',
    message: 'Test notification message',
    type: 'Request',
    createdAt: getYesterDayDate(),
    isRead: false
  }

  beforeEach(() => {
    ;(useNotification as jest.Mock).mockReturnValue({
      markAsReadById: mockMarkAsReadById
    })
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
    ;(DateToReadableFormat as jest.Mock).mockReturnValue('Yesterday')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders notification with correct content', () => {
    render(<Notification notification={mockNotification} />)

    const imgElement = screen.getByAltText("Notification's image")
    const messageElement = screen.getByText('Test notification message')
    const dateElement = screen.getByText('Yesterday')

    expect(imgElement).toBeInTheDocument()
    expect(messageElement).toBeInTheDocument()
    expect(dateElement).toBeInTheDocument()
  })

  test('marks notification as read and navigates on click', () => {
    render(<Notification notification={mockNotification} />)

    const notificationButton = screen.getByRole('button')
    fireEvent.click(notificationButton)

    expect(mockMarkAsReadById).toHaveBeenCalledWith('1')
    expect(mockNavigate).toHaveBeenCalledWith('/notification/1')
  })

  test('applies Unread class for unread notifications', () => {
    render(<Notification notification={mockNotification} />)

    const notificationButton = screen.getByRole('button')
    expect(notificationButton).toHaveClass('Unread')
  })

  test('shows Mark as read button for unread notifications', () => {
    render(<Notification notification={mockNotification} />)

    const markAsReadButton = screen.getByRole('button').querySelector('.MarkAsReadButton')
    expect(markAsReadButton).toBeInTheDocument()
  })

  test('calls markAsReadById and stops propagation when Mark as read button is clicked', () => {
    render(<Notification notification={mockNotification} />)

    const markAsReadButton = screen.getByRole('button').querySelector('.MarkAsReadButton')
    fireEvent.click(markAsReadButton!)

    expect(mockMarkAsReadById).toHaveBeenCalledWith('1')
  })
})
