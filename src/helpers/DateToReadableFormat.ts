export const DateToReadableFormat = (date: Date): string => {
  const now = new Date()
  const objDate = new Date(date)
  const diff = now.getTime() - objDate.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`
  }
  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  }
  if (days > 0) {
    if (days === 1) {
      return 'yesterday'
    } else {
      return `${days} days ago`
    }
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }
  return `${seconds} second${seconds > 1 ? 's' : ''} ago`
}
