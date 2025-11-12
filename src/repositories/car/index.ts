import { CarRepository } from "./car-repository";
import { DrizzleCarRepository } from "./drizzle-car-repository";
import { JsonCarRepository } from "./json-car-repository";

export const carRepository: CarRepository = new DrizzleCarRepository()