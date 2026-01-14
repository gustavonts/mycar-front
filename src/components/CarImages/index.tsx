'use client'

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type CarImagesProps = {
  images: string[] | string
  alt: string
  width?: number
  height?: number
}

export default function CarImages({ images, alt, width = 600, height = 400 }: CarImagesProps) {
    const [index, setIndex] = useState(0)

    // Garantir que sempre seja array
    const imagesArray = Array.isArray(images) ? images : [images]

    if (!imagesArray || imagesArray.length === 0) return null

    const nextImage = () => {
        setIndex((prev) => (prev + 1) % imagesArray.length)
    }

    const prevImage = () => {
        setIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length)
    }

    return (
        <div className="flex items-center justify-center gap-4">
            {imagesArray.length > 1 && (
                <button
                    className="hover:text-slate-300 hover:cursor-pointer"
                    onClick={prevImage}
                >
                    <ArrowLeft />
                </button>
            )}

            <div
                className="relative shadow-lg rounded-xl overflow-hidden"
                style={{ width: `${width}px`, height: `${height}px` }}
            >
                <Image
                    src={imagesArray[index]}
                    alt={alt}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>

            {imagesArray.length > 1 && (
                <button
                    className="hover:text-slate-300 hover:cursor-pointer"
                    onClick={nextImage}
                >
                    <ArrowRight />
                </button>
            )}
        </div>
    )
}
