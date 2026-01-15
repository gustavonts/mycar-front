import { CarModelFromApi } from "@/models/car/car-model";

export type PublicCar = Omit<CarModelFromApi, 'updatedAt'>

export const makePartialPublicCar = (car?: Partial<CarModelFromApi>): PublicCar => {
    return {
        id: car?.id ?? '',
        brand: car?.brand ?? '',
        model: car?.model ?? '',
        version: car?.version ?? '',
        year: car?.year ?? '',
        plate: car?.plate ?? '',             
        fuel: car?.fuel ?? '',
        price: car?.price ?? '',
        mileage: car?.mileage ?? '',
        color: car?.color ?? '',
        description: car?.description ?? '',   
        images: car?.images ?? '',            
        active: car?.active ?? false,
        user: car?.user ?? {
            id: car?.user?.id ?? '',
            name: car?.user?.name ?? '',
            email: car?.user?.email ?? ''
        },
        createdAt: car?.createdAt ?? new Date().toISOString(), 
    }
}

export const makePublicCarFromDb = (car: CarModelFromApi): PublicCar => {
    return makePartialPublicCar(car)
}