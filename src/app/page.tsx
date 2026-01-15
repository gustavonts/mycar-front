import { CarsList } from "@/components/CarsList"
import { SpinLoader } from "@/components/SpinLoader"
import { Suspense } from "react"

export default async function HomePage() {
  return (
    <div>
      <Suspense fallback={<SpinLoader className="min-h-20 mb-16 "/>}>
        {/* <CarFeatured /> */}
        <CarsList />
      </Suspense>
    </div>
  )
}
