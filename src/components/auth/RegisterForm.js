'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    Spacer,
} from '@nextui-org/react';
import { FaArrowLeft } from 'react-icons/fa';  // Importamos el icono de la flecha hacia la izquierda
import { registerUser } from '@/services/authServices';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        ocupacion: '',
        email: '',
        contraseña: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();  // Usamos el router de Next.js

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
        const response = await registerUser(formData);
        alert('Registro exitoso');
        // Aquí podrías redirigir al login o al dashboard
        } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            alert(`Error al registrar: ${error.response.data.message}`);
        } else {
            alert('Error al registrar. Por favor, intente de nuevo más tarde.');
        }
        } finally {
        setIsLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        router.push('/login');  // Redirige a la página de login
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center"> {/* Centrado con Flexbox */}
            <Card className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg mx-auto shadow-md rounded-md bg-gray-200"> {/* Fondo gris claro y ajuste de tamaño */}
                <CardHeader className="flex justify-between items-center">
                    <Button 
                        onClick={handleLoginRedirect} 
                        isIconOnly
                        size="sm"
                        aria-label="Volver a Login"
                    >
                        <FaArrowLeft />
                    </Button>
                    <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                        <Spacer y={1.5} />
                        <Input
                            label="Ocupación"
                            name="ocupacion"
                            value={formData.ocupacion}
                            onChange={handleChange}
                        />
                        <Spacer y={1.5} />
                        <Input
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Spacer y={1.5} />
                        <Input
                            label="Contraseña"
                            name="contraseña"
                            value={formData.contraseña}
                            onChange={handleChange}
                            type="password"
                        />
                        <Spacer y={2} />
                        <Button type="submit" isLoading={isLoading} color="primary" className="w-full">
                            Registrarse
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}
