import { CarModel } from "@/models/car/car-model";

export type PublicCar = Omit<CarModel, 'updatedAt'>

export const makePublicCar = (car: CarModel): PublicCar => {
    return {
        id: car.id,
        fipeCode: car.fipeCode,
        brand: car.brand,
        model: car.model,
        version: car.version,
        year: car.year,
        plate: car.plate,
        fuel: car.fuel,
        price: car.price,
        mileage: car.mileage,
        color: car.color,
        description: car.description,
        images: car.images,
        active: car.active,
        user: car.user,
        createdAt: car.createdAt,
    }
}