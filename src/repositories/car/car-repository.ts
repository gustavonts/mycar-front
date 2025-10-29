import { CarModel } from "@/models/car/car-model";

export interface CarRepository {
    findAll(): Promise<CarModel[]>
    findById(id: string): Promise<CarModel>
}