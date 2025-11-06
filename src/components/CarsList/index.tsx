import { carRepository } from "@/repositories/car/json-car-repository"
import CarCoverImage from "../CarCoverImage"
import CarHeading from "../CarHeading"
import { formatDatetime, formatRelativeDate } from "@/utils/format-datetime"

export async function CarsList() {
    const cars = await carRepository.findAll()

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cars.map(car => {
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
                        <div className="flex flex-col gap-4 sm:justify-center">
                            <time className="text-slate-600 text-sm/tight" dateTime={car.createdAt}>{formatDatetime(car.createdAt)} - {formatRelativeDate(car.createdAt)}</time>
                            <CarHeading url={carLink} as='h2'>
                                <div>
                                    {car.brand} {car.model}
                                </div>
                            </CarHeading>
                            <div>
                                {car.price}
                            </div>
                            <p>
                                {car.description}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}