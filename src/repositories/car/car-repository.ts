import { CarModel } from "@/models/car/car-model";

export interface CarRepository {
    findAllPublic(): Promise<CarModel[]>
    findById(id: string): Promise<CarModel>
}