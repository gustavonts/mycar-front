import { findAllCarsAdmin } from "@/lib/car/queries/admin"
import Link from "next/link"
import { DeleteCarbutton } from "../DeleteCarButton"
import ErrorMessage from "../../ErrorMessage"

export default async function CarsListAdmin() {
    const cars = await findAllCarsAdmin()

    if(cars.length <= 0) return <ErrorMessage contentTitle={"Ei "} content={"Crie algum anúncio!"} />
    

    return <div className="mb-16">
        {cars.map(car => {
            return <div key={car.id} className={`py-2 px-2 ${car.active ? '' : 'bg-slate-300'} flex gap-2 items-center justify-between`}>
                <Link href={`/admin/car/${car.id}`}>
                    {car.brand} {car.model}
                </Link>
                {!car.active && <span className="text-xs text-slate-600 italic">Inativo</span>}
                <DeleteCarbutton id={car.id} brand={car.brand} model={car.model} />
            </div>
        })}
    </div>
}