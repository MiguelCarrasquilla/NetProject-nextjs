'use client'
import React from "react"
import { Card, CardHeader, CardFooter, CardBody, Button, Link, Image } from '@nextui-org/react';
import { formatDate } from "@/utils/FormatDate";

export const FairCard = ({titulo, description, bgPhoto, date, idF, idU}) =>{
    const dateFormated = formatDate(date)
    return(
        <div className="w-84 h-96 bg-white shadow-lg rounded-lg overflow-hidden">
            <Card className="bg-white h-full">
                {/* Imagen */}
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={titulo}
                    className="rounded-b-lg"
                    src={bgPhoto?.String || null}
                />
                <CardBody className="p-4 flex flex-col h-full">
                    {/* Título */}
                    <h4 className="font-bold text-lg">{titulo}</h4>
                    {/* Fecha */}
                    <p className="text-tiny uppercase font-bold">{dateFormated}</p>
                    {/* Descripción */}
                    <small className="text-default-500 truncate">{description}</small>
                </CardBody>

                <CardFooter className="flex justify-center p-4 m-2">
                    <Button as={Link} href={`/feria/${idF}`} color="primary">
                        Más Información
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}