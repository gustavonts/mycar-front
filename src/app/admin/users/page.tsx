import { SpinLoader } from "@/components/SpinLoader"
import { ConstructionIcon } from "lucide-react"
import { Metadata } from "next"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Car Admin'
}

export default async function AdminUsersPage() {
    return <Suspense fallback={<SpinLoader className="mb-16"/>}>
        <div className="flex items-center justify-center text-center ml-5">
            <ConstructionIcon />
            <h1 className="font-bold">- Em Desenvolvimento </h1>
        </div>
    </Suspense>
}