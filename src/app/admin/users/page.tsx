import UserListAdmin from "@/components/admin/UserListAdmin"
import { SpinLoader } from "@/components/SpinLoader"
import { Metadata } from "next"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Car Admin'
}

export default async function AdminUsersPage() {
    return <Suspense fallback={<SpinLoader className="mb-16"/>}>
        <UserListAdmin />
    </Suspense>
}