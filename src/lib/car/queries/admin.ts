import { CarModelFromApi } from "@/models/car/car-model";
import { carRepository } from "@/repositories/car";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cache } from "react";

export const findCarByIdAdmin = cache(
    async (id: string) => {
        return carRepository.findByIdPublic(id)
    }
)

export const findCarByIdFromApiAdmin = cache(
    async (id: string) => {
        const carsResponse = await authenticatedApiRequest<CarModelFromApi> (
            `/cars/me/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-store'
            }
        )

        return carsResponse
    }
)

export const findAllCarsAdmin= cache(
    async () => {
        return carRepository.findAll()
    }
)

export const findAllCarsFromApiAdmin= cache(
    async () => {
        const carsResponse = await authenticatedApiRequest<CarModelFromApi[]> (
            `/cars/me/`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-store'
            }
        )

        return carsResponse
    }
)
