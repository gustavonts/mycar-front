'use server'

import { PublicCarForApiDto, PublicCarForApiSchema, UpdateCarForApiSchema } from "@/lib/car/schemas"
import { getLoginSessionForApi } from "@/lib/login/manage-login"
import { authenticatedApiRequest } from "@/utils/authenticated-api-request"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { updateTag } from 'next/cache'

type UpdateCarActionState = {
    formState: PublicCarForApiDto
    errors: string[]
    sucess?: true
}

export async function updateCarAction(prevState: UpdateCarActionState, formData: FormData): Promise<UpdateCarActionState> {

    const isAuthenticated = await getLoginSessionForApi()
    
    if(!(formData instanceof FormData)) {
        return  {
            formState: {
                ...prevState.formState,
            },
            errors: ['Dados Inválidos']
        }
    }

    const id = formData.get('id')?.toString()  || ''

    if (!id || typeof id  !== 'string') {
        return  {
            formState: {
                ...prevState.formState,
            },
            errors: ['ID Inválidos']
        }  
    }

    const formDataToObj = Object.fromEntries(formData.entries()) 
    const zodParsedObj = UpdateCarForApiSchema.safeParse(formDataToObj)

    if (!isAuthenticated) {
        return {
            formState: PublicCarForApiSchema.parse(formDataToObj),
            errors: ['Não autenticado.']
        }
    }

    if(!zodParsedObj.success) {
        const errors = getZodErrorMessages(zodParsedObj.error.format())
        return {
            errors,
            formState: PublicCarForApiSchema.parse(formDataToObj)
        }
    }

    const newCar = zodParsedObj.data

    const updateCarResponse = await authenticatedApiRequest<PublicCarForApiDto> (
        `/car/me/${id}`,
        {
            method: 'PATCH',
            body: JSON.stringify(newCar),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    if(!updateCarResponse.success) {
        return {
            formState: PublicCarForApiSchema.parse(formDataToObj),
            errors: updateCarResponse.errors
        }
    }

    const car = updateCarResponse.data
    updateTag('cars')

    return {
        formState: PublicCarForApiSchema.parse(car),
        errors: [],
        sucess: true
    }
}