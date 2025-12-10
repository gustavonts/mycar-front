import { CarModel } from "@/models/car/car-model";

export type PublicCar = Omit<CarModel, 'updatedAt'>

export const makePartialPublicCar = (car?: Partial<CarModel>): PublicCar => {
    return {
        id: car?.id ?? '',
        brand: car?.brand ?? '',
        model: car?.model ?? '',
        version: car?.version ?? '',
        year: car?.year ?? '',
        plate: car?.plate ?? '',               // antes ok
        fuel: car?.fuel ?? '',
        price: car?.price ?? '',
        mileage: car?.mileage ?? '',
        color: car?.color ?? '',
        description: car?.description ?? '',   
        images: car?.images ?? [],            
        active: car?.active ?? false,
        user: car?.user ?? '',
        createdAt: car?.createdAt ?? new Date().toISOString(), 
    }
}


export const makePublicCarFromDb = (car: CarModel): PublicCar => {
    return makePartialPublicCar(car)
}