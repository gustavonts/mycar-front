import { formatDatetime, formatRelativeDate } from "@/utils/format-datetime";
import CarHeading from "../CarHeading";

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
            <time className="text-slate-600 text-sm/tight" dateTime={createdAt}>{formatDatetime(createdAt)} - {formatRelativeDate(createdAt)}</time>
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