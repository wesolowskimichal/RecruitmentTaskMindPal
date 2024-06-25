import { useTitle } from '@/hooks/useTitle'
import { Navbar } from '@/components/navbar/Navbar'
import { PageProps } from '@/types/Types'

export const Page = ({ title, children }: PageProps) => {
  useTitle(title)

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
