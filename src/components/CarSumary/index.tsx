import CarHeading from "../CarHeading";
import { CarDate } from "../CarDate";
import { formatMoney } from "@/utils/format-money";

type CarSumaryProps = {
    carHeading: 'h1' | 'h2'
    carLink: string
    createdAt: string
    brand: string
    model: string
    version: string
    year: string
    price: string
    description?: string | null
}

export function CarSumary({
    carHeading,
    carLink,
    createdAt,
    brand,
    model,
    version,
    year,
    price,
    description
}: CarSumaryProps) {

    return (
        <div className="flex flex-col gap-2 text-center">
            <CarDate dateTime={createdAt}  />
            
            <CarHeading url={carLink} as={carHeading}>
                <h2 className="text-lg font-semibold text-gray-800">
                    {brand} {model} {version} ({year})
                </h2>
            </CarHeading>

            <div className="text-xl font-bold text-blue-600">
                {formatMoney(price)}
            </div>

            {description && (
                <p className="text-gray-600 text-sm line-clamp-3">
                    {description}
                </p>
            )}
        </div>
    )
}
