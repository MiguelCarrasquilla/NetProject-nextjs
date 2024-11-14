'use client'
import { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Button
} from "@nextui-org/react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { FaRegPlusSquare } from "react-icons/fa";


export default function NextUi() {
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState(null);  // Almacenamos la información del usuario
    const router = useRouter()

    // Usamos useEffect para asegurarnos de que el componente se renderiza en el cliente
    useEffect(() => {
        setIsClient(true); // Esto se ejecuta solo en el cliente

        // Obtener la cookie 'user' y convertirla a un objeto
        const userCookie = Cookies.get('user');

        if (!!userCookie) {
            setUser(JSON.parse(userCookie));  // Convertir la cookie JSON a objeto
        }
    }, []);

    // Usamos useEffect para asegurarnos de que el componente se renderiza en el cliente
    useEffect(() => {
        setIsClient(true); // Esto se ejecuta solo en el cliente
    }, []);

    // Si estamos en el cliente, renderizamos el navbar
    if (!isClient) {
        return null; // Evitar la renderización en el servidor
    }

    const handleActionDropdown =(key)=>{
        switch (key) {
            case 'settings':
                // Obtener el userId desde las cookies
                const user = Cookies.get('user'); // Obtener la cookie 'user' que contiene la información del usuario
                if (user) {
                    const userData = JSON.parse(user); // Convertir la cookie JSON a objeto
                    const userId = userData.id_usuario; // Asumimos que el ID del usuario está en 'id_usuario'

                    // Redirigir a la ruta dinámica '/profile/[userId]'
                    router.push(`/profile/${userId}`);
                }else {
                    console.error('No se encontró el userId en las cookies.');
                }
                break;
            case 'logout':
                Cookies.remove('token')
                Cookies.remove('user')
                router.push('/login')
                break;
            default:
                break;
        }
    }

    return (
        <div className="pb-4">
            <Navbar isBordered>
                <NavbarBrand>
                    <Link href="/dashboard" className="font-bold text-inherit">NetConnect</Link>
                </NavbarBrand>

                <NavbarContent as="div" justify="end">
                    {/* Solo mostrar Avatar si existe la cookie */}
                    {user && user.nombre ? (
                        <div className="flex gap-4">
                        <Link className="flex flex-col justify-center items-center" href="/feria/crear">
                             {<FaRegPlusSquare size={20} />} Añadir evento
                        </Link>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="default hover:"
                                    name={user.nombre}  // Mostrar el nombre del usuario desde la cookie
                                    size="md"
                                    showFallback 
                                    src={user.foto_perfil}  // Usar la URL del avatar si existe, si no usar un avatar por defecto
                                />
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Profile Actions"
                                variant="flat"
                                onAction={(key)=>{handleActionDropdown(key)}}
                            >
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Conectado como </p>
                                    <p className="font-semibold">{user.email}</p> {/* Mostrar el email desde la cookie */}
                                </DropdownItem>
                                <DropdownItem key="settings">Configuración </DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Desconectarse
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        </div>

                    ): (
                        <NavbarContent justify="end">
                            <NavbarItem className="lg:flex">
                            <Link href="/login">Login</Link>
                            </NavbarItem>
                            <NavbarItem>
                            <Button as={Link} color="primary" href="/register" variant="flat">
                                Sign Up
                            </Button>
                            </NavbarItem>
                        </NavbarContent>
                    )}
                </NavbarContent>
            </Navbar>
        </div>
    );
}
