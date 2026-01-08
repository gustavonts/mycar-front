import { ManageCarForm } from "@/components/admin/ManageCarForm"
import { findCarByIdFromApiAdmin } from "@/lib/car/queries/admin"
import { PublicCarForApiSchema } from "@/lib/car/schemas"
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
    const carRes = await findCarByIdFromApiAdmin(id)

    if(!carRes.success) {
        console.log(carRes.errors)
        notFound()
    }

    const car = carRes.data
    const publicCar = PublicCarForApiSchema.parse(car)

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-xl font-extrabold">Editar veículo</h1>
            <ManageCarForm mode='update' publicCar={publicCar}/>
        </div>   
    )
}