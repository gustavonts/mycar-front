import { CarModel } from "@/models/car/car-model";
import { CarRepository } from "./car-repository";
import { resolve } from "path";
import { readFile, writeFile } from 'fs/promises'
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

     async findById(id: string): Promise<CarModel> {
        const cars = await this.findAllPublic()
        const car = cars.find(car => car.id === id)

        if(!car) {
            throw new Error('Carro não encontrado')
        }

        return car
    }

    private async writeToDisk(cars: CarModel[]): Promise<void> {
        const jsonToString = JSON.stringify({ cars }, null, 2);
        await writeFile(JSON_CARS_FILE_PATH, jsonToString, 'utf-8');
    }

    async create(car: CarModel): Promise<CarModel> {
        const cars = await this.findAll();

        if (!car.id) {
            throw new Error('Post sem ID');
        }

        const idExist = cars.find(
            savedCar => savedCar.id === car.id
        );

        if (idExist) {
            throw new Error('ID deve ser único');
        }

        cars.push(car);
        await this.writeToDisk(cars);

        return car;
    }

  async delete(id: string): Promise<CarModel> {
    const cars = await this.findAll();
    const postIndex = cars.findIndex(c => c.id === id);

    if (postIndex < 0) {
      throw new Error('Post não existe');
    }

    const car = cars[postIndex];
    cars.splice(postIndex, 1);
    await this.writeToDisk(cars);

    return car;
  }

  async update(
    id: string,
    newPostData: Omit<CarModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CarModel> {
    const cars = await this.findAll();
    const carIndex = cars.findIndex(p => p.id === id);
    const savedPost = cars[carIndex];

    if (carIndex < 0) {
      throw new Error('Post não existe');
    }

    const newPost = {
      ...savedPost,
      ...newPostData,
      updatedAt: new Date().toISOString(),
    };
    cars[carIndex] = newPost;
    await this.writeToDisk(cars);
    return newPost;
  }
}
