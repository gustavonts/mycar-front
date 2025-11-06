import { carRepository } from "@/repositories/car/json-car-repository";
import { cache } from "react";

export const findAllPublicCars = cache(async () => 
    await carRepository.findAllPublic())