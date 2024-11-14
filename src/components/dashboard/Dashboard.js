'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardFooter, CardBody, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { fetchAllFairs } from '@/services/dashboardServices';
import Cookies from 'js-cookie';
import { FairCard } from './FairsCard';

export default function Dashboard() {
    const [fairs, setFairs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
            loadFairs();
    }, []);

    const loadFairs = async () => {
        try {
            const response = await fetchAllFairs();
            console.log(response);
            
            setFairs(response);
        } catch (error) {
            console.error('Error al cargar las ferias:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen  mb-4 py-2 px-5">
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <span className="text-xl text-gray-700">Cargando...</span>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-2">
                    {fairs?.map(fair => (
                        <div key={fair.id_feria} className="col-span-1">
                            <FairCard titulo={fair.titulo} description={fair.descripcion} bgPhoto={fair.foto_feria} date={fair.fecha_inicio} idF={fair.id_feria} idU={fair.id_usuario}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
