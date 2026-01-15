import CarHeading from "../CarHeading"
import { CarDate } from "../CarDate"
import { SafeMarkdown } from "../SafeMarkdown"
import { notFound } from "next/navigation"
import { findPublicCarByIdFromApi } from "@/lib/car/queries/public"
import CarImages from "../CarImages"

type SingleCarProps = {
    id: string
}

export async function SingleCar({id}: SingleCarProps) {
    const carRes = await findPublicCarByIdFromApi(id)

    if(!carRes.success) {
        notFound()
    }

    const car = carRes.data

    return (
        <article className="mb-16 bg-blue-50 rounded-xl shadow-lg p-6">
            <header className="group flex flex-col gap-6 mb-8 items-center text-center">
                <CarImages images={car.images} alt={car.model} />
            
                <CarHeading url={`/car/${car.id}`} as={"h1"}>{car.brand} {car.model} {car.version} {car.year}</CarHeading>
                <p>{car.user?.name ?? 'Usuário inativo'} | <CarDate dateTime={car.createdAt} /></p>
            </header>
            <div className="max-w-3xl mx-auto text-center">
                <SafeMarkdown markdown={car.description} />
            </div>
        </article>
    )
}