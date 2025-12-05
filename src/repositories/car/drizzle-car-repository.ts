import { CarModel } from "@/models/car/car-model";
import { CarRepository } from "./car-repository";
import { drizzleDb } from "@/db/drizzle";
import { parseImages } from "@/utils/parse-image";
import { asyncDelay } from "@/utils/async-delay";
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";
import { carsTable } from "@/db/drizzle/schemas";

export class DrizzleCarRepository implements CarRepository {
    async findAllPublic(): Promise<CarModel[]> {
        await asyncDelay(SIMULATE_WAIT_IN_MS, true)
        const cars = await drizzleDb.query.cars.findMany({
            orderBy: (cars, {desc}) => desc(cars.createdAt),
            where: (cars, {eq}) => eq(cars.active, true)
        })

        return cars.map((car) => ({
            ...car,
            images: parseImages(car.images),
        }));
    }

    async findByIdPublic(id: string): Promise<CarModel> {
        await asyncDelay(SIMULATE_WAIT_IN_MS, true)
        const car = await drizzleDb.query.cars.findFirst({
            where: (cars, {eq, and}) => and(eq(cars.active, true), eq(cars.id, id)),

        })

        if (!car) throw new Error('Carro não encontrado para ID')

        return {
            ...car,
            images: parseImages(car.images),
        };
    }
    
    async findAll(): Promise<CarModel[]> {
        await asyncDelay(SIMULATE_WAIT_IN_MS, true)
        const cars = await drizzleDb.query.cars.findMany({
            orderBy: (cars, {desc}) => desc(cars.createdAt)
        })

        return cars.map((car) => ({
            ...car,
            images: parseImages(car.images),
        }));
    }

    async findById(id: string): Promise<CarModel> {
        await asyncDelay(SIMULATE_WAIT_IN_MS, true)
        const car = await drizzleDb.query.cars.findFirst({
            where: (cars, {eq}) => eq(cars.id, id),

        })

        if (!car) throw new Error('Carro não encontrado para ID')

        return {
            ...car,
            images: parseImages(car.images),
        };
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
}

(async () => {
    // const repo = new DrizzleCarRepository()
    // const cars = await repo.findByIdPublic("e6a7b8c9-1234-5678-90ab-cdef01234567")

    // console.log(cars)

    // cars.forEach(car => console.log(car.id, car.brand, car.active))

    // await repo.findByIdPublic("b2c3d4e5-f6a7-8901-2345-lkmfnvgo30874")
})()