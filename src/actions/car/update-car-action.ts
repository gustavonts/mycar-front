'use server'

import { PublicCarForApiDto, PublicCarForApiSchema, UpdateCarForApiSchema } from "@/lib/car/schemas"
import { getLoginSessionForApi } from "@/lib/login/manage-login"
import { authenticatedApiRequest } from "@/utils/authenticated-api-request"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { updateTag } from 'next/cache'

type UpdateCarActionState = {
    formState: PublicCarForApiDto
    errors: string[]
    success?: true
}

export async function updateCarAction(prevState: UpdateCarActionState, formData: FormData): Promise<UpdateCarActionState> {

    const isAuthenticated = await getLoginSessionForApi()
    
    if(!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos']
        }
    }

    const id = formData.get('id')?.toString() || ''
    if (!id) {
        return {
            formState: prevState.formState,
            errors: ['ID inválido']
        }
    }

    const formDataToObj = Object.fromEntries(formData.entries()) as any

    const files = formData.getAll('images') as File[]
    if (files.length > 0) {
        formDataToObj.images = files
    } else {
        delete formDataToObj.images
    }

    const parsed = UpdateCarForApiSchema.safeParse(formDataToObj)
    if (!parsed.success) {
        return {
            errors: getZodErrorMessages(parsed.error.format()),
            formState: PublicCarForApiSchema.parse(formDataToObj)
        }
    }

    if (!isAuthenticated) {
        return {
            formState: PublicCarForApiSchema.parse(formDataToObj),
            errors: ['Não autenticado']
        }
    }

    const newCar = parsed.data

    const updateCarResponse = await authenticatedApiRequest<PublicCarForApiDto>(
        `/car/me/${id}`,
        {
            method: 'PATCH',
            body: JSON.stringify(newCar),
            headers: { 'Content-Type': 'application/json' }
        }
    )

    if (!updateCarResponse.success) {
        return {
            formState: PublicCarForApiSchema.parse(formDataToObj),
            errors: updateCarResponse.errors
        }
    }

    updateTag('cars')


    return {
        formState: PublicCarForApiSchema.parse(updateCarResponse.data),
        errors: [],
        success: true
    }
}
