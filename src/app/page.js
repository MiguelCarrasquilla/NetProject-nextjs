import { useEffect } from 'react';
import { useRouter } from 'next/router';  // Importa el hook useRouter

export default function Home() {
  const router = useRouter();  // Inicializa el router

  useEffect(() => {
    // Redirigir a la página "/dashboard"
    router.push('/dashboard');
  }, [router]);

  return null;  // No necesitas mostrar nada en la página de inicio
}
