import { CarModel } from "@/models/car/car-model";
import { CarRepository } from "./car-repository";
import { drizzleDb } from "@/db/drizzle";
import { parseImages } from "@/utils/parse-image";
import { carsTable } from "@/db/drizzle/schemas";
import { eq } from "drizzle-orm"

export class DrizzleCarRepository implements CarRepository {
    async findAllPublic(): Promise<CarModel[]> {
        const cars = await drizzleDb.query.cars.findMany({
            orderBy: (cars, {desc}) => desc(cars.createdAt),
            where: (cars, {eq}) => eq(cars.active, true)
        })

        return cars
    }

    async findByIdPublic(id: string): Promise<CarModel> {
        const car = await drizzleDb.query.cars.findFirst({
            where: (cars, {eq, and}) => and(eq(cars.active, true), eq(cars.id, id)),

        })

        if (!car) throw new Error('Carro não encontrado para ID')

        return car
    }
    
    async findAll(): Promise<CarModel[]> {
        const cars = await drizzleDb.query.cars.findMany({
            orderBy: (cars, {desc}) => desc(cars.createdAt)
        })

        return cars
    }

    async findById(id: string): Promise<CarModel> {
        const car = await drizzleDb.query.cars.findFirst({
            where: (cars, {eq}) => eq(cars.id, id),

        })

        if (!car) throw new Error('Carro não encontrado para ID')

        return car
    }
    
    async create(car: CarModel): Promise<CarModel> {
        const carExists = await drizzleDb.query.cars.findFirst({
            where: (cars, {eq}) =>
                eq(cars.id, car.id),
            columns: {id: true}
        })

        if ( !!carExists) {
            throw new Error ('Carro com esse ID já existe na base de dados')
        }

        await drizzleDb.insert(carsTable).values(car)

        return car
    }


    async delete(id: string): Promise<CarModel> {
        const car = await drizzleDb.query.cars.findFirst({
            where: (cars, {eq}) => eq(cars.id, id)
        })

        if (!car) {
            throw new Error ('Carro não existe')
        }

        await drizzleDb.delete(carsTable).where(eq(carsTable.id, id))

        return car
    }

    async update(id: string, newCarData: Omit<CarModel, 'id' | 'createdAt' | 'updatedAt'>): Promise <CarModel> {
        const oldCar = await drizzleDb.query.cars.findFirst({
            where: (cars, {eq}) => eq(cars.id, id)
        })

        if(!oldCar) {
            throw new Error('Carro não existe')
        }

        const updatedAt = new Date().toISOString()
        const carData = {
            brand: newCarData.brand,
            model: newCarData.model,
            version: newCarData.version,
            year: newCarData.year,
            plate: newCarData.plate,
            fuel: newCarData.fuel,
            price: newCarData.price,
            mileage: newCarData.mileage,
            color: newCarData.color,
            description: newCarData.description,
            images: newCarData.images,
            active: newCarData.active,
            user: newCarData.user,
            updatedAt: updatedAt,
        }

        await drizzleDb.update(carsTable).set(carData).where(eq(carsTable.id, id))

        return {
            ...oldCar,
            ...carData
        }
    }
}

