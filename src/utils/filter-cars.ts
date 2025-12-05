import { CarModel } from "@/models/car/car-model"

type FilterParams = {
    search?: string
    minPrice?: string
    maxPrice?: string
    brand?: string
    fuel?: string
    minYear?: string
    maxYear?: string
    maxMileage?: string
}

export function filterCars(cars: CarModel[], filters: FilterParams): CarModel[] {
    return cars.filter(car => {
        // Filtro de pesquisa (marca, modelo, versão)
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            const searchableText = `${car.brand} ${car.model} ${car.version} ${car.year}`.toLowerCase()
            if (!searchableText.includes(searchLower)) {
                return false
            }
        }

        // Filtro de preço mínimo
        if (filters.minPrice) {
            const minPriceNum = parseFloat(filters.minPrice)
            const carPrice = parseFloat(car.price)
            if (isNaN(carPrice) || carPrice < minPriceNum) {
                return false
            }
        }

        // Filtro de preço máximo
        if (filters.maxPrice) {
            const maxPriceNum = parseFloat(filters.maxPrice)
            const carPrice = parseFloat(car.price)
            if (isNaN(carPrice) || carPrice > maxPriceNum) {
                return false
            }
        }

        // Filtro de marca
        if (filters.brand && car.brand !== filters.brand) {
            return false
        }

        // Filtro de combustível
        if (filters.fuel && car.fuel !== filters.fuel) {
            return false
        }

        // Filtro de ano mínimo
        if (filters.minYear) {
            const minYearNum = parseInt(filters.minYear)
            const carYear = parseInt(car.year)
            if (isNaN(carYear) || carYear < minYearNum) {
                return false
            }
        }

        // Filtro de ano máximo
        if (filters.maxYear) {
            const maxYearNum = parseInt(filters.maxYear)
            const carYear = parseInt(car.year)
            if (isNaN(carYear) || carYear > maxYearNum) {
                return false
            }
        }

        // Filtro de quilometragem máxima
        if (filters.maxMileage) {
            const maxMileageNum = parseInt(filters.maxMileage)
            const carMileage = parseInt(car.mileage)
            if (isNaN(carMileage) || carMileage > maxMileageNum) {
                return false
            }
        }

        return true
    })
}

