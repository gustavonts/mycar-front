import CarCoverImage from "../CarCoverImage";
import { CarSumary } from "../CarSumary";
import { findAllPublicCars } from "@/lib/car/queries";

export async function CarFeatured(){
    const cars = await findAllPublicCars()
    const car = cars[0]
    
    const carLink =  `/car/${car.id}`

    return (
        <section className="
                grid grid-cols-1 gap-8 mb-16
                sm:grid-cols-2
                group">
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
                } />
            <CarSumary 
                carHeading={"h1"} 
                carLink={carLink} 
                createdAt={car.createdAt} 
                brand={car.brand} 
                model={car.model} 
                version={car.version} 
                year={car.year} 
                price={car.price} 
                description={car.description} />
        </section>
    )
}