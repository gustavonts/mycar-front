import { CarRepository } from "./car-repository";
import { DrizzleCarRepository } from "./drizzle-car-repository";

export const carRepository: CarRepository = new DrizzleCarRepository()