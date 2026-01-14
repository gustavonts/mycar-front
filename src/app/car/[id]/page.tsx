import { SingleCar } from "@/components/SingleCar";
import { SpinLoader } from "@/components/SpinLoader";
import { findPublicCarByIdFromApi } from "@/lib/car/queries/public";
import { Metadata } from "next";
import { Suspense } from "react";

type CarIdPageProps = {
    params: Promise<{id: string}>
}

export async function generateMetadata({params}: CarIdPageProps): Promise<Metadata> {
    const { id } = await params;
    const carRes = await findPublicCarByIdFromApi(id)

    if (!carRes.success) {
        return {
        title: 'Carro não encontrado',
        description: 'Carro não encontrado'
        }
    }

    const car = carRes.data
    
    return {
        title: car.brand + ' ' + car.model + ' - ' + car.plate,
        description: car.brand + ' ' + car.model
    }
}

export default async function CarIdPage({params}: CarIdPageProps) {
    const { id } = await params;

    return (
        <Suspense fallback={<SpinLoader className="min-h-20 mb-16"/>}>
            <SingleCar id={id} />
        </Suspense>
    ) 
}