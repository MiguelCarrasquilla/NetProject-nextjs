'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Importa el hook useRouter

export default function Home() {
  const router = useRouter();  // Inicializa el router

  useEffect(() => {
    // Redirigir a la página "/dashboard"
    router.push('/dashboard');
  }, [router]);

  return (
    <div> Cargando...</div>
  )
}
