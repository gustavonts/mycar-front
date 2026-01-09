'use server'

import {  CreateCarForApiSchema, PublicCarForApiDto, PublicCarForApiSchema } from "@/lib/car/schemas"
import { getLoginSessionForApi  } from "@/lib/login/manage-login"
import { authenticatedApiRequest } from "@/utils/authenticated-api-request"

import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { updateTag } from "next/cache"
import { redirect } from "next/navigation"


type CreateCarActionState = {
    formState: PublicCarForApiDto
    errors: string[]
    success?: true
}

export async function createCarAction(prevState: CreateCarActionState, formData: FormData): Promise<CreateCarActionState> {

    const isAuthenticated = await getLoginSessionForApi()
    
    if(!(formData instanceof FormData)) {
        return  {
            formState: {
                ...prevState.formState,
            },
            errors: ['Dados Inválidos']
        }
    }
    const formDataToObj: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
        formDataToObj[key] = value
    }
    
    const zodParsedObj = CreateCarForApiSchema.safeParse(formDataToObj)

    if(!zodParsedObj.success) {
        const errors = getZodErrorMessages(zodParsedObj.error.format())
        return {
            errors,
            formState: PublicCarForApiSchema.parse(formDataToObj)
        }
    }

    if (!isAuthenticated) {
        return {
            formState: PublicCarForApiSchema.parse(formDataToObj),
            errors: ['Não autenticado.']
        }
    }

    const newCar = zodParsedObj.data

    const createCarResponse = await authenticatedApiRequest<PublicCarForApiDto>(
        `/car/me`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        }
    )

    if(!createCarResponse.success) {
        return {
            formState: PublicCarForApiSchema.parse(formDataToObj),
            errors: createCarResponse.errors
        }
    }

    const createdCar = createCarResponse.data

    updateTag('cars')
    redirect(`/admin/car/${createdCar.id}?created=1`)

}