import { findCarByIdCached } from "@/lib/car/queries"
import Image from "next/image"
import CarHeading from "../CarHeading"
import { CarDate } from "../CarDate"
import { SafeMarkdown } from "../SafeMarkdown"
import { formatMoney } from "@/utils/format-money"

type SingleCarProps = {
    id: string
}

export async function SingleCar({id}: SingleCarProps) {
    const car = await findCarByIdCached(id)
    const images = Array.isArray(car.images) ? car.images : [car.images]
    
    return (
        <article className="mb-16">
            {/* Header com Gradiente */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 mb-8 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <CarHeading url={`/car/${car.id}`} as={"h1"}>
                            <span className="text-white">{car.brand} {car.model} {car.version}</span>
                        </CarHeading>
                        <div className="mt-2 text-blue-100 flex flex-wrap items-center gap-3">
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                {car.year}
                            </span>
                            <span className="text-blue-100 text-sm">
                                <CarDate dateTime={car.createdAt} />
                            </span>
                            {car.user && <span>• Anunciado por {car.user}</span>}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-blue-100 mb-1">Preço</div>
                        <div className="text-3xl md:text-4xl font-extrabold text-white">
                            {formatMoney(car.price)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Galeria de Imagens */}
            <div className="mb-8">
                {images.length === 1 ? (
                    <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                        <Image 
                            className="w-full h-auto object-cover"
                            src={images[0]} 
                            width={1200} 
                            height={720} 
                            alt={`${car.brand} ${car.model}`}
                            priority
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                            <Image 
                                className="w-full h-full object-cover"
                                src={images[0]} 
                                width={800} 
                                height={600} 
                                alt={`${car.brand} ${car.model}`}
                                priority
                            />
                        </div>
                        {images.slice(1, 5).map((image, index) => (
                            <div key={index} className="hidden md:block rounded-xl overflow-hidden shadow-lg border-2 border-white hover:scale-105 transition-transform duration-300">
                                <Image 
                                    className="w-full h-full object-cover"
                                    src={image} 
                                    width={400} 
                                    height={300} 
                                    alt={`${car.brand} ${car.model} - Imagem ${index + 2}`}
                                />
                            </div>
                        ))}
                        {images.length > 5 && (
                            <div className="md:col-span-2 md:col-start-3 md:row-start-2">
                                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center border-2 border-blue-100 shadow-md">
                                    <div className="text-3xl mb-2">📸</div>
                                    <div className="text-slate-700 font-semibold">+{images.length - 5} imagens adicionais</div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Informações Principais */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Preço em Destaque (Mobile) */}
                    <div className="lg:hidden bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg">
                        <div className="text-white/90 text-sm mb-2 font-medium">Preço</div>
                        <div className="text-4xl font-extrabold text-white">
                            {formatMoney(car.price)}
                        </div>
                    </div>

                    {/* Informações Rápidas */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                        <h2 className="text-2xl font-bold mb-4 text-slate-900 flex items-center gap-2">
                            <span>📋</span> Informações Rápidas
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                                <div className="text-2xl mb-2">🛣️</div>
                                <div className="text-xs text-blue-600 mb-1">Quilometragem</div>
                                <div className="font-bold text-blue-900">
                                    {parseInt(car.mileage).toLocaleString('pt-BR')} km
                                </div>
                            </div>
                            <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                                <div className="text-2xl mb-2">⛽</div>
                                <div className="text-xs text-orange-600 mb-1">Combustível</div>
                                <div className="font-bold text-orange-900">{car.fuel}</div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
                                <div className="text-2xl mb-2">🎨</div>
                                <div className="text-xs text-purple-600 mb-1">Cor</div>
                                <div className="font-bold text-purple-900">{car.color}</div>
                            </div>
                            {car.plate && (
                                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                                    <div className="text-2xl mb-2">🚗</div>
                                    <div className="text-xs text-green-600 mb-1">Placa</div>
                                    <div className="font-bold text-green-900">{car.plate}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Descrição */}
                    {car.description && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 flex items-center gap-2">
                                <span>📝</span> Descrição
                            </h2>
                            <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600">
                                <SafeMarkdown markdown={car.description} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar com Informações Técnicas */}
                <aside className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl p-6 sticky top-4 border border-slate-200">
                        <h2 className="text-xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                            <span className="text-2xl">🔧</span> Detalhes Técnicos
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <div className="text-xs text-blue-600 mb-1 font-medium">Marca</div>
                                <div className="font-bold text-blue-900 text-lg">{car.brand}</div>
                            </div>
                            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                                <div className="text-xs text-indigo-600 mb-1 font-medium">Modelo</div>
                                <div className="font-bold text-indigo-900 text-lg">{car.model}</div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                <div className="text-xs text-purple-600 mb-1 font-medium">Versão</div>
                                <div className="font-bold text-purple-900 text-lg">{car.version}</div>
                            </div>
                            <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
                                <div className="text-xs text-slate-600 mb-1 font-medium">Ano</div>
                                <div className="font-bold text-slate-900 text-lg">{car.year}</div>
                            </div>
                            {car.fipeCode && (
                                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                    <div className="text-xs text-amber-600 mb-1 font-medium">Código FIPE</div>
                                    <div className="font-bold text-amber-900 text-sm font-mono">{car.fipeCode}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    )
}