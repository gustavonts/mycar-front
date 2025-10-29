import { carRepository } from "@/repositories/car/json-car-repository"

export async function CarsList() {
    const cars = await carRepository.findAll()

    return (
        <div>
            {cars.map(car => {
            return (
                <p key={car.id}>{car.model}</p>
            )
            })}
        </div>
    )
}