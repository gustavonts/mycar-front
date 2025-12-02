import { ManageCarForm } from "@/components/admin/ManageCarForm"
import { Metadata } from "next"

export const dynamic = 'force-dynamic'

export const metadata : Metadata = {
    title: 'Criar veículo'
}

export default async function AdminNewCarPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-xl font-extrabold">Criar um veículo</h1>
            <ManageCarForm />
        </div>      
    )
}