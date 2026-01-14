import Image from "next/image"
import CarHeading from "../CarHeading"
import { CarDate } from "../CarDate"
import { SafeMarkdown } from "../SafeMarkdown"
import { notFound } from "next/navigation"
import { findPublicCarByIdFromApi } from "@/lib/car/queries/public"

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
        <article className="mb-16">
            <header className="group flex flex-col gap-4 mb-4">
                <Image 
                    className="rounded-xl"
                    src={car.images} 
                    width={1200} 
                    height={720} 
                    alt={car.model} />
            
                <CarHeading url={`/car/${car.id}`} as={"h1"}>{car.brand} {car.model} {car.version} {car.year}</CarHeading>
                <p>{car.user.name} | <CarDate dateTime={car.createdAt} /></p>
            </header>
            <div>
                <SafeMarkdown markdown={car.description} />
            </div>
        </article>
    )
}