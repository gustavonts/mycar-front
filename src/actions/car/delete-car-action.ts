'use server'

import { verifyLoginSession } from "@/lib/login/manage-login"
import { carRepository } from "@/repositories/car"
import { updateTag } from "next/cache"

export async function deleteCarAction(id: string ) {

    const isAuthenticated = await verifyLoginSession()
    console.log(isAuthenticated)

    if (!isAuthenticated) {
        return {
            error: 'Não autenticado.'
        }
    }
    

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