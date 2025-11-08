import { SingleCar } from "@/components/SingleCar";
import { SpinLoader } from "@/components/SpinLoader";
import { findPostByIdCached } from "@/lib/car/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type CarIdPageProps = {
    params: Promise<{id: string}>
}

export async function generateMetadata({params}: CarIdPageProps): Promise<Metadata> {
    const { id } = await params;
    const car = await findPostByIdCached(id)

    return {
        title: car.brand + ' ' + car.model + ' - ' + car.plate,
        description: car.brand + ' ' + car.model
    }
}

export default async function CarIdPage({params}: CarIdPageProps) {
    const {id} = await params;

    return (
        <Suspense fallback={<SpinLoader className="min-h-20 mb-16"/>}>
            <SingleCar id={id} />
        </Suspense>
    ) 
}