import { CarModelFromApi } from "@/models/car/car-model";
import { apiRequest } from "@/utils/api-request";

export const findAllPublicCarsFromApiCached  = async () => {
    const carsResponse = await apiRequest<CarModelFromApi[]>(
        `/car`,
        {
            cache: "no-store",
        }
    )
    return carsResponse
}

export const findPublicCarByIdFromApi = async(id: string) => {
    const carResponse = await apiRequest<CarModelFromApi>(
        `/car/${id}`,
    )

    return carResponse
}
