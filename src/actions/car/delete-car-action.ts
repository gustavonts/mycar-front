'use server'

import { PublicCarForApiDto } from "@/lib/car/schemas"
import { getLoginSessionForApi, verifyLoginSession } from "@/lib/login/manage-login"
import { authenticatedApiRequest } from "@/utils/authenticated-api-request"
import { revalidatePath } from "next/cache"

export async function deleteCarAction(id: string ) {

    const isAuthenticated = await getLoginSessionForApi()

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

    const carResponse = await authenticatedApiRequest<PublicCarForApiDto> (
        `/car/${id}`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )


    

    if (!carResponse.success) {
        return {
            error: 'Erro ao encontrar o veículo'
        }
    } 

    const deleteCarResponse = await authenticatedApiRequest<PublicCarForApiDto> (
        `/car/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    if (!deleteCarResponse.success) {
        return {
            error: 'Erro ao apagar o veículo'
        }
    } else {
        revalidatePath('/admin')
    }

    return {
        error: ''
    }
}