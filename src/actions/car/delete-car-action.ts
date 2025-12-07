'use server'

import { carRepository } from "@/repositories/car"
import { updateTag } from "next/cache"

export async function deleteCarAction(id: string ) {

    if(!id || typeof id !== 'string') {
        return {
            error: 'Dados inválidos'
        }
    }

    try {
        await carRepository.delete(id)
    } catch(e: unknown) {
        if(e instanceof Error) {
            return {
                error: e.message
            }
        }

        return {
            error: 'Erro desconhecido'
        }
    }

    updateTag('cars')
    updateTag(`car-${id}`)

    return {
        error: ''
    }
}