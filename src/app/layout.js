import './globals.css'
import { Providers } from './provider';

export const metadata = {
    title: 'NetConnect',
    description: 'Página para conectar y ver ferias de networking',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="text-black light">
        <body>
            <Providers>
                <main>
                    {children}  {/* El contenido principal de las páginas */}
                </main>
            </Providers>
        </body>
        </html>
    );
}
