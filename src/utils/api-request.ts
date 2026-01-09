import { string } from "zod"

type ApiRequestError = {
    errors: string[]
    success: false
    status: number
}

type ApiRequestSuccess<T> = {
    data: T 
    success: true
    status: number
}

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>

export const apiUrl = process.env.API_URL || 'http://localhost:3001'


export async function apiRequest<T> (
    url: string,
    options?: RequestInit
): Promise<ApiRequest<T>> {
    const fullurl = `${apiUrl}${url}`

    try {
        const res = await fetch(url, options)
        const json = await res.json().catch(() => null)

        if (!res.ok) {
            const errors = Array.isArray(json?.message)
            ? json.message
            : [json?.message || 'Erro inesperado']

            return {
                errors,
                success: false,
                status: res.status
            }
        }

        return {
            success: true,
            data: json,
            status: res.status
        }
    } catch (err) {
         console.log(err)

         return {
            errors: ['Erro desconhecido'],
            success: false,
            status: 500
         }
    }
}