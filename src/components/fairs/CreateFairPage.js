'use client';

import { useRouter } from 'next/navigation';
import { createFair, getFair, getAllFairs, updateFair, deleteFair } from '@/services/fairsServices';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {Spacer, Input, Button, Divider, Image, DatePicker} from "@nextui-org/react";
import {now, getLocalTimeZone} from "@internationalized/date";

const CreateFair = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState()
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);
    const token = Cookies.get('token');
    const [userId, setUserId] = useState()
    const [valueDate, setValueDate] = useState(now(getLocalTimeZone())) // Default value
    const [formInfo, setFormInfo] = useState({
        titulo: undefined,
        descripcion: undefined,
        id_usuario: undefined,
        fecha_inicio: undefined,
        foto_feria: undefined
    })

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (!!userCookie) {
            const parsedCookie = JSON.parse(userCookie);
            setUserId(parsedCookie.id_usuario);
        }
    }, []);

    // Handle Date Selection
    const handleDate = (date) => {
        // Asegúrate de que la fecha está en el formato correcto y conviértela a un objeto Date
        console.log(date);

        const dateString = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}T${String(date.hour).padStart(2, '0')}:${String(date.minute).padStart(2, '0')}`;

        setValueDate(date);
        setFormInfo({
            ...formInfo,
            fecha_inicio: dateString, // Updating formInfo
        });
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
                    foto_feria: file // Guardamos el archivo para enviar a la API
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
        formData.append("titulo", formInfo.titulo);
        formData.append("descripcion", formInfo.descripcion);
        formData.append("fecha_inicio", formInfo.fecha_inicio);
        formData.append("id_usuario", userId);

        if (formInfo.foto_feria) {
            formData.append("foto_feria", formInfo.foto_feria);
        }

        try {
            const response = await createFair(formData, userId);  // Mandando formData y userId
            console.log('Feria creada', response);
            router.push(`/feria/${response.id_feria}`)
        } catch (error) {
            console.error('Error al crear feria:', error);
        } finally {
            setIsLoadingInfo(false);
        }
    };

    return (
        <>
            <div className='w-screen px-6'>
                <div className='py-2'>
                    <h1 className='text-bold font-medium text-lg'> Crea tu Feria</h1>
                </div>
                <Divider className='my-4'></Divider>
                <div className='p-4'>
                    <div className='py-2'>
                        <h1 className='text-bold font-medium text-lg'> Portada de la Feria </h1>
                            <div className='flex pt-2 justify-between items-center gap-6'>
                                <Image
                                    src={imageUrl}
                                    width={600}
                                    height={300}
                                    className='max-w-[600px]'
                                />
                                <input
                                    type="file"
                                    name="foto_feria"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                    </div>
                </div>
                <div className='p-4'>
                    <div className='py-2'>
                        <h1 className='text-bold font-medium text-lg'> Información de la Feria</h1>
                    </div>
                    <form onSubmit={handleSubmitInfo} className="space-y-4">
                        <Input
                            label="Título"
                            name="titulo"
                            value={formInfo.titulo}
                            onChange={handleChangeInfo}
                            type="text"
                        />
                        <Spacer y={1.5} />
                        <Input
                            label="Descripción"
                            name="descripcion"
                            value={formInfo.descripcion}
                            onChange={handleChangeInfo}
                            type="text"
                        />
                        <Spacer y={1.5} />
                        <DatePicker
                            label="Fecha de Inicio"
                            name='fecha_inicio'
                            variant="bordered"
                            hideTimeZone
                            showMonthAndYearPickers
                            value={valueDate}
                            onChange={handleDate}
                            defaultValue={now(getLocalTimeZone())}  // Default current date
                        />
                        <Spacer y={2} />
                        <Button type="submit" isLoading={isLoadingInfo} color="primary" auto className="w-full">
                            Crear Feria
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateFair;
