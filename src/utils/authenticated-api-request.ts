import 'server-only'
import { getLoginSessionForApi } from "@/lib/login/manage-login"
import { redirect } from "next/navigation"
import { apiRequest, ApiRequest } from "./api-request"

export async function authenticatedApiRequest<T>(path: string, options?: RequestInit): Promise<ApiRequest<T>> {
    if(typeof window != 'undefined') {
        throw new Error(
            'authenticatedApiRequest só pode ser usado do lado do servidor'
        )
    }

    const jwtToken = await getLoginSessionForApi()

    if(!jwtToken) {
        return {
            success: false,
            errors: ['usuário não autenticado'],
            status: 401
        }
    }

    const headers = {
        Authorization: `Bearer ${jwtToken}`,
        ...options?.headers
    }

    return apiRequest<T>(path, {
        ...options,
        headers
    })
}