'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

type PaginationProps = {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
}

export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage }: PaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const updatePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        if (page === 1) {
            params.delete('page')
        } else {
            params.set('page', page.toString())
        }
        const queryString = params.toString()
        router.push(queryString ? `/?${queryString}` : '/', { scroll: false })
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const pages = useMemo(() => {
        const pagesArray: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            // Mostrar todas as páginas
            for (let i = 1; i <= totalPages; i++) {
                pagesArray.push(i)
            }
        } else {
            // Lógica para páginas com ellipsis
            if (currentPage <= 3) {
                // Início: 1, 2, 3, 4, ..., last
                for (let i = 1; i <= 4; i++) {
                    pagesArray.push(i)
                }
                pagesArray.push('...')
                pagesArray.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                // Fim: 1, ..., n-3, n-2, n-1, n
                pagesArray.push(1)
                pagesArray.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pagesArray.push(i)
                }
            } else {
                // Meio: 1, ..., current-1, current, current+1, ..., last
                pagesArray.push(1)
                pagesArray.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pagesArray.push(i)
                }
                pagesArray.push('...')
                pagesArray.push(totalPages)
            }
        }

        return pagesArray
    }, [currentPage, totalPages])

    if (totalPages <= 1) {
        return null
    }

    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    return (
        <div className="flex flex-col items-center gap-4 mt-8">
            <div className="text-sm text-slate-600">
                Mostrando {startItem} a {endItem} de {totalItems} veículos
            </div>
            
            <div className="flex items-center gap-2">
                {/* Botão Anterior */}
                <button
                    onClick={() => updatePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    ← Anterior
                </button>

                {/* Números de página */}
                <div className="flex items-center gap-1">
                    {pages.map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
                                    ...
                                </span>
                            )
                        }

                        const pageNum = page as number
                        const isActive = pageNum === currentPage

                        return (
                            <button
                                key={pageNum}
                                onClick={() => updatePage(pageNum)}
                                className={`
                                    w-10 h-10 rounded-lg border transition-all font-medium
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md'
                                        : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-50 hover:border-blue-300'
                                    }
                                `}
                            >
                                {pageNum}
                            </button>
                        )
                    })}
                </div>

                {/* Botão Próximo */}
                <button
                    onClick={() => updatePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    Próximo →
                </button>
            </div>
        </div>
    )
}

