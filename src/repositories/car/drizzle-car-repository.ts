import { CarModel } from "@/models/car/car-model";
import { CarRepository } from "./car-repository";
import { drizzleDb } from "@/db/drizzle";
import { carsTable } from "@/db/drizzle/schemas";
import { desc } from "drizzle-orm";

export class DrizzleCarRepository implements CarRepository {
    async findAllPublic(): Promise<CarModel[]> {
        const cars = await drizzleDb.query.cars.findMany({
            orderBy: (cars, {desc}) => desc(cars.createdAt),
            where: (cars, {eq}) => eq(cars.active, true)
        })

        return cars
    }

    async findByIdPublic(id: string): Promise<CarModel> {
        throw new Error("Method not implemented.");
    }
    
    async findAll(): Promise<CarModel[]> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<CarModel> {
        throw new Error("Method not implemented.");
    }

    
}