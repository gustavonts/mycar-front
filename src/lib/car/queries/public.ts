import { CarModelFromApi } from "@/models/car/car-model";
import { carRepository } from "@/repositories/car/index";
import { apiRequest } from "@/utils/api-request";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findAllPublicCarsCached  = cache(unstable_cache(async () => {
    return await carRepository.findAllPublic()
    },
        ['cars'],
    {
        tags: ['cars']
    }
))

export const findAllPublicCarsFromApiCached  = cache(unstable_cache(async () => {
    const carsResponse = await apiRequest<CarModelFromApi[]>(
        `/car`,
        {
            next: {
                tags: ['cars'],
                revalidate: 86400
            }
        }
    )
    return carsResponse
}))


export const findPublicCarByIdCached = cache((id: string) => {
    return unstable_cache(
        async (id: string) =>  {
            const car =  await carRepository
                .findByIdPublic(id)
                .catch(() => undefined)

            if(!car) {
                notFound()
            }

            return car
        },
        [`car-${id}`],
        {
            tags: [`car-${id}`]
        }
    )(id)
})

export const findPublicCarByIdFromApiCached = cache(async(id: string) => {
    const carsResponse = await apiRequest<CarModelFromApi>(
        `/car/${id}`,
        {
            next: {
                tags: [`car/${id}`],
                revalidate: 86400
            }
        }
    )
    return carsResponse
})
