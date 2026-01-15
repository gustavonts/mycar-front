'use server'

import {  CreateCarForApiSchema, PublicCarForApiDto, PublicCarForApiSchema } from "@/lib/car/schemas"
import { getLoginSessionForApi  } from "@/lib/login/manage-login"
import { authenticatedApiRequest } from "@/utils/authenticated-api-request"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
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

    for (const key of formData.keys()) {
        const values = formData.getAll(key)

        if (key === 'images') {
            formDataToObj[key] = values.map(String)
        } else {
            formDataToObj[key] = values[0]
        }
    }
    
    const zodParsedObj = CreateCarForApiSchema.safeParse(formDataToObj)

    if (!zodParsedObj.success) {
        return {
            errors: getZodErrorMessages(zodParsedObj.error.format()),
            formState: {
            ...prevState.formState,
            ...formDataToObj,
            images: Array.isArray(formDataToObj.images)
                ? formDataToObj.images
                : []
            }
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

    redirect(`/admin/car/${createdCar.id}?created=1`)

}