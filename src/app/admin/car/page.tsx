import CarsListAdmin from "@/components/admin/CarListAdmin"
import { SpinLoader } from "@/components/SpinLoader"
import { Metadata } from "next"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Car Admin'
}

export default async function AdminCarPage() {
    return <Suspense fallback={<SpinLoader className="mb-16"/>}>
        <CarsListAdmin/>
    </Suspense>
}