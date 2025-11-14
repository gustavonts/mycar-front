import { findAllCarsAdmin } from "@/lib/car/queries/admin"

export default async function CarsListAdmin() {
    const cars = await findAllCarsAdmin()

    return <div className="py-16 text-6xl">
        {cars.map(car => {
            return <p key={car.id}>{car.brand}</p>
        })}
    </div>
}