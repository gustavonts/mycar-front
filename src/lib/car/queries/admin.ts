import { carRepository } from "@/repositories/car";
import { cache } from "react";

export const findCarByIdAdmin = cache(
    async (id: string) => {
        return carRepository.findByIdPublic(id)
    }
)

export const findAllCarsAdmin= cache(
    async () => {
        return carRepository.findAll()
    }
)
