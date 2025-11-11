import { JsonCarRepository } from "@/repositories/car/json-car-repository";
import { drizzleDb } from ".";
import { carsTable } from "./schemas";

(async () => {
  console.log("🚀 Script iniciado...");

  const jsonCarRepository = new JsonCarRepository();
  const cars = await jsonCarRepository.findAll();

  // 🔧 Converte `images: string[]` → JSON string
  const carsFormatted = cars.map((car) => ({
    ...car,
    images: JSON.stringify(car.images ?? []),
  }));

  try {
    await drizzleDb.delete(carsTable);
    await drizzleDb.insert(carsTable).values(carsFormatted);
    console.log("✅ Seed inserido com sucesso!");
  } catch (e) {
    console.log("Ocorreu um erro...");
    console.error(e);
  }
})();
