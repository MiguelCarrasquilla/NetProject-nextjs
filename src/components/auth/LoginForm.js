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
import { loginUser } from '@/services/authServices';
import Cookies from 'js-cookie';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        contraseña: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();  // Usamos el router de Next.js

    const handleRegisterRedirect = () => {
        router.push('/register');  // Redirige a la página de registro
    };

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
            const response = await loginUser(formData);
            // Almacenamos el token en localStorage
            console.log(response);
            Cookies.set('token', response.token)
            Cookies.set('user', JSON.stringify(response.user))
            router.push('/dashboard');
            } catch (error) {
            console.error('Error:', error);
            } finally {
            setIsLoading(false);
            }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center"> {/* Centrado con flexbox */}
            <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xl mx-auto shadow-md rounded-md"> {/* Ajusta el tamaño según el ancho de la pantalla */}
                <CardHeader className="flex justify-center">
                    <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
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
                        <Button type="submit" isLoading={isLoading} color="primary" auto className="w-full">
                            Iniciar Sesión
                        </Button>
                    </form>
                    <Spacer y={1} />
                    <Button onClick={handleRegisterRedirect} color="secondary" auto className="w-full">
                        Crear Cuenta
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
