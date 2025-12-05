import CarCoverImage from "../CarCoverImage"
import { CarSumary } from "../CarSumary"
import { findAllPublicCarsCached } from "@/lib/car/queries"
import { CarFilters } from "../CarFilters"
import { filterCars } from "@/utils/filter-cars"
import { Pagination } from "../Pagination"

type CarsListProps = {
    filters?: {
        search?: string
        minPrice?: string
        maxPrice?: string
        brand?: string
        fuel?: string
        minYear?: string
        maxYear?: string
        maxMileage?: string
        page?: string
    }
}

const ITEMS_PER_PAGE = 12

export async function CarsList({ filters = {} }: CarsListProps) {
    const allCars = await findAllPublicCarsCached()
    const filteredCars = filterCars(allCars, filters)
    
    // Paginação
    const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE)
    let currentPage = parseInt(filters.page || '1', 10)
    
    // Validar página atual
    if (currentPage < 1) currentPage = 1
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedCars = filteredCars.slice(startIndex, endIndex)

    return (
        <section className="mb-16">
            {/* Header com gradiente */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 shadow-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                    Nossos Veículos
                </h1>
                <p className="text-blue-100 text-lg">
                    {filteredCars.length} {filteredCars.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}
                    {filteredCars.length !== allCars.length && (
                        <span className="ml-2 text-blue-200">
                            (de {allCars.length} total)
                        </span>
                    )}
                </p>
            </div>

            {/* Filtros */}
            <CarFilters cars={allCars} />

            {/* Resultado quando não há carros */}
            {filteredCars.length === 0 ? (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-12 text-center border border-blue-100">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">Nenhum veículo encontrado</h2>
                    <p className="text-slate-600">Tente ajustar os filtros de busca</p>
                </div>
            ) : (
                <>
                    {/* Grid de carros */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {paginatedCars.map(car => {
                        const carLink =  `/car/${car.id}`
                        return (
                            <div 
                                key={car.id} 
                                className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
                            >
                                <div className="relative overflow-hidden">
                                    <CarCoverImage 
                                        linkProps={{
                                            href: carLink
                                        }} 
                                        imageProps={{
                                            width: 400,
                                            height: 300,
                                            src: car.images[0],
                                            alt: car.model,
                                        }} 
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-900 shadow-md">
                                        {car.year}
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col bg-gradient-to-b from-white to-slate-50">
                                    <CarSumary 
                                        carHeading={'h2'}
                                        carLink={carLink} 
                                        createdAt={car.createdAt} 
                                        brand={car.brand} 
                                        model={car.model} 
                                        version={car.version} 
                                        year={car.year} 
                                        price={car.price}
                                        mileage={car.mileage}
                                        fuel={car.fuel}
                                        description={car.description}  />
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    
                    {/* Paginação */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredCars.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                    />
                </>
            )}
        </section>
    )
}