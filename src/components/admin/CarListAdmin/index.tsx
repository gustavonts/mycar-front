import { findAllCarsFromApiAdmin } from "@/lib/car/queries/admin"
import Link from "next/link"
import { DeleteCarbutton } from "../DeleteCarButton"
import ErrorMessage from "../../ErrorMessage"

export default async function CarsListAdmin() {
    const carsRes = await findAllCarsFromApiAdmin()

    if (!carsRes.success) {
        console.log(carsRes.errors)
        return (
            <ErrorMessage contentTitle="Ei :D" content='Tente fazer login novamente!' />
        )
    }
    
    const cars = carsRes.data

    if(cars.length <= 0) return <ErrorMessage contentTitle={"Ei "} content={"Crie algum anúncio!"} />
    
    return <div className="mb-16">
        {cars.map(car => {
            return (
                <Link key={car.id} href={`/admin/car/${car.id}`}> 
                    <div className={`py-2 px-2 ${car.active ? '' : 'bg-slate-300'} flex gap-2 items-center justify-between hover:bg-slate-200 hover:cursor-pointer`}>
                        {car.brand} {car.model} - Placa: {car.plate}
                        {!car.active && <span className="text-xs text-slate-600 italic">Inativo</span>}
                        <DeleteCarbutton id={car.id} brand={car.brand} model={car.model} />
                    </div>
                </Link>
            )
        })}
    </div>
}