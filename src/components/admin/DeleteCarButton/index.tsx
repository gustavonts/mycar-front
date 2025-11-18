'use client'

import { deleteCarAction } from "@/actions/car/delete-car-action"
import { Dialog } from "@/components/Dialog"
import { Trash2Icon } from "lucide-react"
import { useState, useTransition } from "react"

type DeleteCarbuttonProps = {
    id: string
    brand: string
    model: string
}

export function DeleteCarbutton({id, brand, model}: DeleteCarbuttonProps) {

    const [isPending, startTransition] = useTransition()
    const [showDialog, setShowDialog] = useState(false)

    function handleClick() {
        setShowDialog(true)
        if(!confirm('Tem Certeza?')) return

        startTransition(async () => {
            const result = await deleteCarAction(id)
            alert('O result é:' + result)
        })
    }

    return (
        <>
            <button className="text-red-500 cursor-pointer [&_svg]:w-5 [&_svg]:h-5 hover:scale-120 transition hover:text-red-700 disabled:text-slate-600 disabled:cursor-not-allowed" 
                aria-label={`Apagar carro: ${brand} ${model}`} 
                title={`Apagar carro: ${brand} ${model}`}
                onClick={handleClick}
                disabled={isPending}>
                <Trash2Icon/>
            </button>
            {showDialog && <Dialog title={"Apagar carro?"} content={`Tem Certeza que deseja apagar o carro ${brand} ${model}`} isVisible={showDialog}/>}
        </>
    )
}