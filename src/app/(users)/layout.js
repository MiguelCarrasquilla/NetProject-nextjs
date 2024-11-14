import '.././globals.css'
import dynamic from "next/dynamic";

export const metadata = {
    title: 'NetConnect',
    description: 'Página para conectar y ver ferias de networking',
};

const NextUi = dynamic(() => import("@/components/ui/Navbar/Navbar"), { ssr: false });


export default function RootLayout({ children }) {
    return (
        <div className="text-black light">
                <NextUi />  {/* Agrega el Navbar aquí */}
                <main>
                    {children}  {/* El contenido principal de las páginas */}
                </main>
        </div>
    );
}
