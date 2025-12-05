import { CarsList } from "@/components/CarsList"
import { SpinLoader } from "@/components/SpinLoader"
import { Suspense } from "react"

type HomePageProps = {
  searchParams: Promise<{
    search?: string
    minPrice?: string
    maxPrice?: string
    brand?: string
    fuel?: string
    minYear?: string
    maxYear?: string
    maxMileage?: string
    page?: string
  }>
}

export const dynamic = 'force-dynamic'

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  
  return (
    <div>
      <Suspense fallback={<SpinLoader className="min-h-20 mb-16 "/>}>
        <CarsList filters={params} />
      </Suspense>
    </div>
  )
}
