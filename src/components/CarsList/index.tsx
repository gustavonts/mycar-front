import { findAllPublicCarsFromApiCached } from "@/lib/car/queries/public"
import CarCoverImage from "../CarCoverImage"
import { CarSumary } from "../CarSumary"

export async function CarsList() {
    const carsRes = await findAllPublicCarsFromApiCached()

    if (!carsRes.success || carsRes.data.length === 0) {
        return null
    }

    const cars = carsRes.data

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {cars.map(car => {
                const carLink = `/car/${car.id}`
                return (
                    <a
                        key={car.id} 
                        className="block flex flex-col gap-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                        href={carLink}
                    >
                        {car.images[0] && (
                            <CarCoverImage 
                                linkProps={{ href: carLink }} 
                                imageProps={{
                                    width: 1200,
                                    height: 720,
                                    src: car.images[0],
                                    alt: car.model,
                                    className: "object-cover h-48 w-full",
                                    priority: true,
                                    unoptimized: true
                                }} 
                            />
                        )}

                        <div className="p-4 flex flex-col gap-2">
                            <CarSumary 
                                carHeading={'h2'}
                                carLink={carLink} 
                                createdAt={car.createdAt} 
                                brand={car.brand} 
                                model={car.model} 
                                version={car.version} 
                                year={car.year} 
                                price={car.price} 
                                description={car.description}  
                            />
                        </div>
                    </a>
                )
            })}
        </div>
    )
}
