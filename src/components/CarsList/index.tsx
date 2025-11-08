import CarCoverImage from "../CarCoverImage"
import { CarSumary } from "../CarSumary"
import { findAllPublicCarsCached } from "@/lib/car/queries"

export async function CarsList() {
    const cars = await findAllPublicCarsCached()

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16">
            {cars.slice(1).map(car => {
                const carLink =  `/car/${car.id}`
                return (
                    <div key={car.id} className="flex flex-col gap-4 group">
                        <CarCoverImage 
                            linkProps={
                                {
                                    href: carLink
                                }
                            } 
                            imageProps={
                                {
                                    width: 1200,
                                    height: 720,
                                    src: car.images[0],
                                    alt: car.model,
                                    priority: true
                                }
                            } 
                        />
                       <CarSumary 
                            carHeading={'h1'}
                            carLink={carLink} 
                            createdAt={car.createdAt} 
                            brand={car.brand} 
                            model={car.model} 
                            version={car.version} 
                            year={car.year} 
                            price={car.price} 
                            description={car.description}  />
                    </div>
                )
            })}
        </div>
    )
}