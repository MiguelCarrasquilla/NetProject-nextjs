'use client'
import { getFair } from "@/services/fairsServices"
import {
    Avatar,
    Button,
    Card,
    CardBody,
    Image,
    User
} from "@nextui-org/react"
import { useEffect, useState } from "react"
import { formatDate } from "@/utils/FormatDate"
import { getUsers } from "@/services/authServices"
import { useRouter } from "next/navigation"

const FairView = ({params}) =>{
    const router = useRouter()
    const [fair, setFair] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState()
    const [user, setUser] = useState()

    useEffect(()=>{
        const getUserData = async () => {
            let userId
            setIsLoading(true)
            try {
                const response = await getFair(params)
                setFair(response)
                const formattedDate = formatDate(response.fecha_inicio);
                userId = response.id_usuario
                setDate(formattedDate)
                try {
                    const response = await getUsers(userId)
                    setUser(response)
                    console.log(response);
                    
                } catch (error) {
                    console.error('Error al cargar el usuario', error);
                }
            } catch (error) {
                console.error('Error al cargar las ferias', error);
            } finally {
                setIsLoading(false);
            }
        }
        getUserData();
    },[])

    return(
        <>
            {!isLoading ?(
                <div className="grid lg:mx-96 md:mx-60 sm:mx-2 grid-cols-1 justify-center items-center space-y-4">
                    <div className="w-full h-auto flex justify-center">
                        <Card>
                            <Image
                                src={fair?.foto_feria?.String}
                                alt="Fair Image" 
                                className="object-cover w-full h-auto"
                            />
                        </Card>
                    </div>
                    <div className="text-start mx-20">
                        <h3 className="font-medium text-lg text-black">{date}</h3>
                        <h1 className="text-4xl font-semibold text-black">{fair?.titulo}</h1>
                        <p className="text-base text-gray-600 mt-4">{fair?.descripcion}</p>
                    </div>
                    <div className="flex justify-center items-center mx-20 gap-2">
                        <h4 className="font-medium text-lg text-black">Por </h4>
                        <div className="flex justify-between rounded-xl items-center bg-gray-50 w-72 h-20 p-3">
                            <div>
                                <User
                                    avatarProps={{radius: "lg", src: user?.foto_perfil}}
                                    description={user?.email}
                                    name={user?.nombre}
                                >
                                    {user?.email}
                                </User>
                            </div>
                            <Button
                                variant="ghost"
                                color="primary"
                                onPress={()=>{router.push(`/user/${user?.id_usuario}`)}}
                            >
                                Ver Perfil
                            </Button>
                        </div>
                    </div>
                </div>
            ):(
                <div> Cargando...</div>
            )
            }

        </>
    )
}

export default FairView