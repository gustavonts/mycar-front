import { carRepository } from "@/repositories/car/index";
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
