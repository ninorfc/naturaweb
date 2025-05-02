import './globals.css'

export const metadata = {
  title: 'Naturaweb',
  description: 'Guia natural com IA sobre plantas e ervas medicinais.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}