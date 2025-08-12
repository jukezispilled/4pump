import "./globals.css"

export const metadata = {
  title: "4pump",
  description: "for the culture",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="custom-gradient min-h-screen">
        <main className="py-4">{children}</main>
      </body>
    </html>
  )
}