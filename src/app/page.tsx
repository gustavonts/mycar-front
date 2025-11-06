import { CarsList } from "@/components/CarsList"
import { SpinLoader } from "@/components/SpinLoader"
import { Suspense } from "react"
import { CarFeatured } from "@/components/CarFeatured"

export default async function HomePage() {
  return (
    <div>
      <Suspense fallback={<SpinLoader/>}>
        <CarFeatured />
      </Suspense>
      
      <Suspense fallback={<SpinLoader/>}>
        <CarsList />
      </Suspense>
    </div>
  )
}
