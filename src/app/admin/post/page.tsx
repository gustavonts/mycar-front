import CarsListAdmin from "@/components/CarListadmin"
import { SpinLoader } from "@/components/SpinLoader"
import { findAllCarsAdmin } from "@/lib/car/queries/admin"
import { Metadata } from "next"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Car Admin'
}

export default async function AdminPostPage() {
    return <Suspense fallback={<SpinLoader className="mb-16"/>}>
        <CarsListAdmin/>
    </Suspense>
}