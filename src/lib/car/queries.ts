import { carRepository } from "@/repositories/car/json-car-repository";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findAllPublicCarsCached  = cache(async () => 
    await carRepository.findAllPublic()
)

export const findPostByIdCached   = cache(async (id: string) => {
    const car =  await carRepository.findByIdPublic(id).catch(() => undefined)

    if(!car) {
        notFound()
    }

    return car
})