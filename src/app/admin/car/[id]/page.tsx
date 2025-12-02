import { ManageCarForm } from "@/components/admin/ManageCarForm"
import { makePublicCar } from "@/dto/car/dto"
import { findCarByIdAdmin } from "@/lib/car/queries/admin"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export const metadata : Metadata = {
    title: 'Editar veículo'
}

type AdminCarIdPageProps = {
    params: Promise<{
        id: string
    }>
}

export default async function AdminCarIdPage({params}: AdminCarIdPageProps) {
    const {id} = await params
    const car = await findCarByIdAdmin(id).catch()

    const publicCar = makePublicCar(car)

    if (!car) notFound()

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-xl font-extrabold">Editar veículo</h1>
            <ManageCarForm publicCar={publicCar}/>
        </div>   
    )
}