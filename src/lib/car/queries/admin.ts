import { CarModelFromApi } from "@/models/car/car-model";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

export const findCarByIdFromApiAdmin = async (id: string) => {
    const carsResponse = await authenticatedApiRequest<CarModelFromApi> (
        `/car/${id}`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        }
    )

    return carsResponse
}

export const findAllCarsFromApiAdmin = async () => {
    const carsResponse = await authenticatedApiRequest<CarModelFromApi[]> (
        `/car/me`,
    
        {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        }
    )

    return carsResponse
}

