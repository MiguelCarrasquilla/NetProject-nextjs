import '../globals.css'

export const metadata = {
  title: 'NetConnect',
  description: 'Página para conectar y ver ferias de networking',
}

export default function RootLayout({ children }) {
  return (
    <div>
          {children}
    </div>
  )
}
