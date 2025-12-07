import { CarModel } from "@/models/car/car-model";

export interface CarRepository {
    findAllPublic(): Promise<CarModel[]>
    findAll(): Promise<CarModel[]>
    findByIdPublic(id: string): Promise<CarModel>
    findById(id: string): Promise<CarModel>

    create(car: CarModel): Promise<CarModel>
    delete(id: string): Promise<CarModel>
    update(id: string, newCarData: Omit<CarModel, 'id' | 'createdAt' | 'updatedAt'>): Promise<CarModel>
}