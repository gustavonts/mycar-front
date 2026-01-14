import CarCoverImage from "../CarCoverImage";
import { CarSumary } from "../CarSumary";
import { findAllPublicCarsFromApiCached } from "@/lib/car/queries/public";
import ErrorMessage from "../ErrorMessage";

export async function CarFeatured(){
    const carsRes = await findAllPublicCarsFromApiCached()

    const noCarsFound = (
        <ErrorMessage contentTitle={"Ops! "} content={"Ainda não criamos nenhum Carro!"} />
    )

    if (!carsRes.success) {
        return noCarsFound
    }

    const cars = carsRes.data

    if (cars.length <= 0) {
        return noCarsFound
    }

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
                        src: car.images,
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