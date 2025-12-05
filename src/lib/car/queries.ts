import { carRepository } from "@/repositories/car/index";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findAllPublicCarsCached  =  unstable_cache(cache(async () => {
    return await carRepository.findAllPublic()
}), ['cars'], {
    tags: ['cars']
})

export const findCarByIdCached = (id: string) => unstable_cache(cache(async (id: string) => {
    const car =  await carRepository.findByIdPublic(id).catch(() => undefined)

    if(!car) {
        notFound()
    }

    return car
    }), ['cars'], {
        tags: [`car-${id}`]
    }
)(id)