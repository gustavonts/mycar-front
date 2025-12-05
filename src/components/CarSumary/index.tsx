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
    mileage?: string
    fuel?: string
    description?: string | null
}

export async function CarSumary({carHeading, carLink, createdAt, brand, model, version, year, price, mileage, fuel, description} : CarSumaryProps) {
    return (
         <div className="flex flex-col gap-3 sm:justify-center">
            <CarDate dateTime={createdAt} />
            <CarHeading url={carLink} as={carHeading}>
                {brand} {model} {version}
            </CarHeading>
            <div className="flex flex-col gap-2">
                <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {formatMoney(price)}
                </div>
                {(mileage || fuel) && (
                    <div className="flex flex-wrap gap-3 text-sm">
                        {mileage && (
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                                🛣️ {parseInt(mileage).toLocaleString('pt-BR')} km
                            </span>
                        )}
                        {fuel && (
                            <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium">
                                ⛽ {fuel}
                            </span>
                        )}
                    </div>
                )}
            </div>
            {description && (
                <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    )
}