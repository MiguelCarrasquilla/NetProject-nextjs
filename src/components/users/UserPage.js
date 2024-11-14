'use client';

import { useRouter } from 'next/navigation';
import { fetchUserPreferences, createPreferences, updateUserPreferences } from '@/services/preferencesServices';
import { updateUser } from '@/services/authServices';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Card, CardHeader, CardBody, Spacer, Input, Button, Divider, Avatar, Image } from "@nextui-org/react";

const UserPage = ({ userId }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);
    const [user, setUser] = useState();
    const [userPreferences, setUserPreferences] = useState();
    const token = Cookies.get('token');
    const [imageUrl, setImageUrl] = useState()
    const [formDataPref, setFormDataPref] = useState({
        linkedinlink: undefined,
        instagramlink: undefined,
        xlink: undefined,
    });
    const [formInfo, setFormInfo] = useState({
        nombre: undefined,
        ocupacion: undefined,
        email:undefined,
        //contraseña:undefined
        foto_perfil: undefined
    })

    useEffect(() => {
        const getUserData = async () => {
            try {
                const preferences = await fetchUserPreferences(userId, token);
                if (preferences) {
                    setUserPreferences(preferences);
                    console.log(preferences);
                    setFormDataPref({
                        linkedinlink: preferences.linkedinlink || '',
                        instagramlink: preferences.instagramlink || '',
                        xlink: preferences.xlink || '',
                    });
                }
            } catch (error) {
                console.error('Error al cargar las preferencias del usuario:', error);
            } finally {
                setIsLoading(false);
            }
        };
        const userCookie = Cookies.get('user');
        if (!!userCookie) {
            const parsedCookie = JSON.parse(userCookie)  // Convertir la cookie JSON a objeto
            setUser(parsedCookie)        // Actualizar formInfo con los datos del usuario en la cookie
            setImageUrl(parsedCookie?.foto_perfil)
            setFormInfo({
                nombre: parsedCookie?.nombre || '', 
                ocupacion: parsedCookie?.ocupacion || '', 
                email: parsedCookie?.email || '', 
                foto_perfil: parsedCookie?.foto_perfil || ''  // Asumiendo que la cookie contiene la URL de la foto
            });
        }
        getUserData();
    }, [userId]);

    // Manejo de cambios en los campos del formulario
    const handleChangePref = (e) => {
        const { name, value } = e.target;
        setFormDataPref({
            ...formDataPref,
            [name]: value,
        });
    };

    const handleSubmitPreferences = async (e) => {
        e.preventDefault();
        const preferencesData = { 
            ...formDataPref, 
            id_usuario: Number(userId),
            id_pref: userPreferences?.id_pref
        };
        setIsLoading(true);

        try {
            let response;
            if (userPreferences) {
                // Si hay preferencias existentes, hacer un UPDATE
                response = await updateUserPreferences(token, preferencesData);
                console.log('Preferencias actualizadas:', response);
            } else {
                // Si no existen preferencias, hacer un CREATE
                response = await createPreferences(preferencesData, token);
                console.log('Preferencias creadas:', response);
            }
            alert('Preferencias guardadas exitosamente');
        } catch (error) {
            console.error('Error al guardar las preferencias del usuario:', error);
            alert('Error al guardar las preferencias. Por favor, intente de nuevo más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        setFormInfo({
            ...formInfo,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Obtener el primer archivo seleccionado
        if (file) {
            // Validamos que el archivo sea del tipo esperado (Imagen)
            if (file && file.type.startsWith("image/")) {
                setImageUrl(URL.createObjectURL(file)); // Crear una URL temporal para la imagen
                setFormInfo({
                    ...formInfo,
                    foto_perfil: file // Guardamos el archivo para enviar a la API
                });
            } else {
                console.error("El archivo seleccionado no es una imagen.");
                alert("Por favor, seleccione una imagen.");
            }
        } else {
            console.error("No se seleccionó ningún archivo.");
            alert("No se seleccionó ningún archivo.");
        }
    };

    const handleSubmitInfo = async (e) => {
        e.preventDefault();
        setIsLoadingInfo(true);
        console.log(formInfo);

        const formData = new FormData();
        formData.append("nombre", formInfo.nombre);
        formData.append("ocupacion", formInfo.ocupacion);
        formData.append("email", formInfo.email);

        if (formInfo.foto_perfil) {
            formData.append("foto_perfil", formInfo.foto_perfil);
        }

        try {
            const response = await updateUser(formData, userId);  // Mandando formData y userId
            console.log('Usuario actualizado:', response);
            Cookies.set('user', JSON.stringify(response))
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        } finally {
            setIsLoadingInfo(false);
        }
    };


    return (
        <>
            <div className='w-screen px-6'>
                <div className='py-2'>
                    <h1 className='text-bold font-medium text-lg'> Información de la Cuenta</h1>
                </div>
                <Divider className='my-4'></Divider>
                <div className='p-4'>
                    <div className='py-2'>
                        <h1 className='text-bold font-medium text-lg'> Foto de Perfil</h1>
                        <div className='flex pt-2 justify-start items-center gap-4'>
                            <Image
                                src={imageUrl}
                                width={150}
                                height={150}
                                className='rounded-full'
                            />
                            <input
                                type="file"
                                name="foto_perfil"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>
                <div className='p-4'>
                    <div className='py-2'>
                        <h1 className='text-bold font-medium text-lg'> Información de Usuario</h1>
                    </div>
                    <form onSubmit={handleSubmitInfo} className="space-y-4">
                        <Input
                            label="Nombre"
                            name="nombre"
                            value={formInfo.nombre}
                            onChange={handleChangeInfo}
                            type="text"
                        />
                        <Spacer y={1.5} />
                        <Input
                            label="Ocupación"
                            name="ocupacion"
                            value={formInfo.ocupacion}
                            onChange={handleChangeInfo}
                            type="text"
                        />
                        <Spacer y={1.5} />
                        <Input
                            label="Email"
                            name="email"
                            value={formInfo.email}
                            onChange={handleChangeInfo}
                            type="text"
                        />
                        <Spacer y={2} />
                        <Button type="submit" isLoading={isLoadingInfo} color="primary" auto className="w-full">
                            Guardar Información
                        </Button>
                    </form>
                </div>
                <Divider className='my-4'></Divider>
                <div className= "p-4">
                    <div className='py-2'>
                        <h1 className='text-bold font-medium text-lg'>Preferencias de Usuario </h1>
                    </div>
                    <form onSubmit={handleSubmitPreferences} className="space-y-4">
                        <Input
                            label="LinkedIn"
                            name="linkedinlink"
                            value={formInfo.linkedinlink}
                            onChange={handleChangePref}
                            type="text"
                        />
                        <Spacer y={1.5} />
                        <Input
                            label="Instagram"
                            name="instagramlink"
                            value={formDataPref.instagramlink}
                            onChange={handleChangePref}
                            type="text"
                        />
                        <Spacer y={1.5} />
                        <Input
                            label="XLink"
                            name="xlink"
                            value={formDataPref.xlink}
                            onChange={handleChangePref}
                            type="text"
                        />
                        <Spacer y={2} />
                        <Button type="submit" isLoading={isLoading} color="primary" auto className="w-full">
                            Guardar Preferencias
                        </Button>
                    </form>
                </div>
            </div>
        </>

    );
};

export default UserPage;
