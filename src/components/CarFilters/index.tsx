'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

type CarFiltersProps = {
    cars: Array<{
        brand: string
        model: string
        fuel: string
        year: string
        price: string
        mileage: string
    }>
}

export function CarFilters({ cars }: CarFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
    const [brand, setBrand] = useState(searchParams.get('brand') || '')
    const [fuel, setFuel] = useState(searchParams.get('fuel') || '')
    const [minYear, setMinYear] = useState(searchParams.get('minYear') || '')
    const [maxYear, setMaxYear] = useState(searchParams.get('maxYear') || '')
    const [maxMileage, setMaxMileage] = useState(searchParams.get('maxMileage') || '')

    // Extrair valores únicos para os selects
    const brands = Array.from(new Set(cars.map(c => c.brand))).sort()
    const fuels = Array.from(new Set(cars.map(c => c.fuel))).sort()
    const years = Array.from(new Set(cars.map(c => c.year))).sort((a, b) => parseInt(b) - parseInt(a))

    const updateURL = useCallback(() => {
        const params = new URLSearchParams()
        
        if (search) params.set('search', search)
        if (minPrice) params.set('minPrice', minPrice)
        if (maxPrice) params.set('maxPrice', maxPrice)
        if (brand) params.set('brand', brand)
        if (fuel) params.set('fuel', fuel)
        if (minYear) params.set('minYear', minYear)
        if (maxYear) params.set('maxYear', maxYear)
        if (maxMileage) params.set('maxMileage', maxMileage)

        const queryString = params.toString()
        router.push(queryString ? `/?${queryString}` : '/', { scroll: false })
    }, [search, minPrice, maxPrice, brand, fuel, minYear, maxYear, maxMileage, router])

    const handleReset = useCallback(() => {
        setSearch('')
        setMinPrice('')
        setMaxPrice('')
        setBrand('')
        setFuel('')
        setMinYear('')
        setMaxYear('')
        setMaxMileage('')
        router.push('/', { scroll: false })
    }, [router])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            updateURL()
        }, 300) // Debounce de 300ms

        return () => clearTimeout(timeoutId)
    }, [search, updateURL])

    useEffect(() => {
        updateURL()
    }, [minPrice, maxPrice, brand, fuel, minYear, maxYear, maxMileage, updateURL])

    const hasActiveFilters = search || minPrice || maxPrice || brand || fuel || minYear || maxYear || maxMileage

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span>🔍</span> Filtros de Busca
                </h2>
                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Limpar Filtros
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Campo de Pesquisa */}
                <div className="xl:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        🔎 Pesquisar
                    </label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Marca, modelo, versão..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>

                {/* Preço Mínimo */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        💰 Preço Mínimo
                    </label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="R$ 0,00"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>

                {/* Preço Máximo */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        💰 Preço Máximo
                    </label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="R$ 0,00"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>

                {/* Marca */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        🏭 Marca
                    </label>
                    <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        <option value="">Todas as marcas</option>
                        {brands.map(b => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>

                {/* Combustível */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        ⛽ Combustível
                    </label>
                    <select
                        value={fuel}
                        onChange={(e) => setFuel(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        <option value="">Todos</option>
                        {fuels.map(f => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                </div>

                {/* Ano Mínimo */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        📅 Ano Mínimo
                    </label>
                    <select
                        value={minYear}
                        onChange={(e) => setMinYear(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        <option value="">Qualquer</option>
                        {years.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {/* Ano Máximo */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        📅 Ano Máximo
                    </label>
                    <select
                        value={maxYear}
                        onChange={(e) => setMaxYear(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        <option value="">Qualquer</option>
                        {years.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {/* Quilometragem Máxima */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        🛣️ Quilometragem Máxima
                    </label>
                    <input
                        type="number"
                        value={maxMileage}
                        onChange={(e) => setMaxMileage(e.target.value)}
                        placeholder="km"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
            </div>
        </div>
    )
}

