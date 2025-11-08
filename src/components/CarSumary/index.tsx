import CarHeading from "../CarHeading";
import { CarDate } from "../CarDate";

type CarSumaryProps = {
    carHeading: 'h1' | 'h2'
    carLink: string
    createdAt: string
    brand: string
    model: string
    version: string
    year: string
    price: string
    description: string
}

export async function CarSumary({carHeading, carLink, createdAt, brand, model, version, year, price, description} : CarSumaryProps) {
    return (
         <div className="flex flex-col gap-4 sm:justify-center">
            <CarDate dateTime={createdAt} />
            <CarHeading url={carLink} as={carHeading}>
                <div>
                    {brand} {model} {version} {year}
                </div>
            </CarHeading>
            <div>
                {price}
            </div>
            <p>
                {description}
            </p>
        </div>
    )
}