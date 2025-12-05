import CarCoverImage from "../CarCoverImage";
import { CarSumary } from "../CarSumary";
import { findAllPublicCarsCached } from "@/lib/car/queries";

export async function CarFeatured(){
    const cars = await findAllPublicCarsCached()
    
    if (cars.length === 0) {
        return (
            <section className="mb-16">
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <p className="text-slate-600 text-lg">Nenhum veículo disponível no momento.</p>
                </div>
            </section>
        )
    }
    
    const car = cars[0]
    const carLink =  `/car/${car.id}`

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Destaque</h2>
            <div className="
                grid grid-cols-1 gap-8
                sm:grid-cols-2
                bg-white rounded-2xl shadow-lg overflow-hidden
                group hover:shadow-xl transition-shadow">
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
                <div className="p-6 sm:p-8">
                    <CarSumary 
                        carHeading={"h1"} 
                        carLink={carLink} 
                        createdAt={car.createdAt} 
                        brand={car.brand} 
                        model={car.model} 
                        version={car.version} 
                        year={car.year} 
                        price={car.price}
                        mileage={car.mileage}
                        fuel={car.fuel}
                        description={car.description} />
                </div>
            </div>
        </section>
    )
}