import "./globals.css"
import BodyWrapper from './components/BodyWrapper'

export const metadata = {
  title: "4pump",
  description: "for the culture",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <BodyWrapper>{children}</BodyWrapper>
    </html>
  )
}