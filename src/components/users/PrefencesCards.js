'use client'
import { useEffect, useState } from "react"
import { fetchUserPreferences } from "@/services/preferencesServices"
import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Link,
    Image
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { getUsers } from "@/services/authServices"
import { FaLink } from "react-icons/fa6";


const PreferencesCard = ({userId}) =>{
    const router = useRouter()
    const [user, setUser] = useState()
    const [preferences, setPreferences] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const token = Cookies.get("token") || "DASJKDSAKJDAS"
    useEffect(()=>{
        setIsLoading(true)
        const getUserInfo = async () =>{
            try {
                const response = await fetchUserPreferences(userId, token)
                setPreferences(response)
                const userResponse = await getUsers(userId)
                setUser(userResponse)
                console.log(response);
                
            } catch (error) {
                console.log("Error consiguendo la info del usuario",error);
            } finally{
                setIsLoading(false)
            }
        }
        getUserInfo()
    },[])

    const handleOpenNewTab = (tab) => {
        // Usar window.open para abrir una nueva pestaña
        const url = tab; // URL a la que deseas redirigir
        window.open(url, '_blank'); // '_blank' indica que se abrirá en una nueva pestaña
    };

    return(
        <>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <span className="text-xl text-gray-700">Cargando...</span>
                </div>
            ):(
                <div className="w-full h-full flex justify-center items-center">
                    <Card className="w-[400px] h-[600px]">
                        <CardBody className="justify-start items-center">
                            <div className="relative">
                                <Image
                                    isBlurred
                                    width={250}
                                    radius="full"
                                    src={user?.foto_perfil}
                                    alt="NextUI Album Cover"
                                    className="static"
                                />
                                <Button
                                className="absolute bottom-[-30px] border-1 shadow-sm bg-white transform skew-y-[-2deg]"
                                size="lg"
                                >
                                    {user?.nombre}
                                </Button>
                            </div>
                            <div className="mt-16 space-y-1 text-center">
                                <h3 className="text-lg font-semibold text-gray-700">{user?.ocupacion}</h3>
                                <h3 className="text-lg font-semibold text-gray-700">{user?.email}</h3>
                            </div>
                            <div className="flex flex-col gap-1 items-center text-start mt-10">
                                <Button
                                startContent={<FaLink className=""/>}
                                className="border-1 shadow-sm bg-white transform skew-y-2"
                                size="md"
                                onPress={()=>{handleOpenNewTab(preferences?.linkedinlink)}}
                                >
                                    {preferences?.linkedinlink}
                                </Button>
                                <Button
                                startContent={<FaLink className=""/>}
                                className="border-1 shadow-sm bg-white transform skew-y-[-2deg]"
                                size="md"
                                onPress={()=>{handleOpenNewTab(preferences?.instagramlink)}}
                                >
                                    {preferences?.instagramlink}
                                </Button>
                                <Button
                                startContent={<FaLink className=""/>}
                                className="border-1 shadow-sm bg-white transform skew-y-2"
                                size="md"
                                onPress={()=>{handleOpenNewTab(preferences?.xlink)}}
                                >
                                    {preferences?.xlink}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
        </>
    )
}

export default PreferencesCard