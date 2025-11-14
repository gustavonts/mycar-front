import { CarModel } from "@/models/car/car-model";
import { CarRepository } from "./car-repository";
import { resolve } from "path";
import { readFile } from 'fs/promises'
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";

const ROOT_DIR = process.cwd()
const JSON_CARS_FILE_PATH = resolve(ROOT_DIR, 'src', 'db', 'seed', 'cars.json')
export class JsonCarRepository implements CarRepository {

    private async simulateWait() {
        if(SIMULATE_WAIT_IN_MS <= 0) return
        await new Promise(resolve => setTimeout(resolve, SIMULATE_WAIT_IN_MS))
    }

    private async readFromDisk(): Promise<CarModel[]>{
        const jsonContent = await readFile(JSON_CARS_FILE_PATH, 'utf-8')
        const parsedjson = JSON.parse(jsonContent)
        const { cars } = parsedjson
        return cars
    }

    async findAll(): Promise<CarModel[]> {
        const cars = await this.readFromDisk()
        return cars
    }

    async findAllPublic(): Promise<CarModel[]> {
        const cars = await this.readFromDisk()
        return cars.filter(car => car.active)
    }

    async findByIdPublic(id: string): Promise<CarModel> {
        const cars = await this.findAllPublic()
        const car = cars.find(car => car.id === id)

        if(!car) {
            throw new Error('Carro não encontrado')
        }

        return car
    }
}
