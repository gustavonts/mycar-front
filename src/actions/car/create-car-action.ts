'use server'

import { makePartialPublicCar, PublicCar } from "@/dto/car/dto"
import { CarCreateSchema } from "@/lib/car/validations"
import { requireLoginSessionOrRedirect, verifyLoginSession } from "@/lib/login/manage-login"
import { CarModel } from "@/models/car/car-model"
import { carRepository } from "@/repositories/car"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { v4 as uuidV4 } from "uuid"

type CreateCarActionState = {
    formState: PublicCar
    errors: string[]
    sucess?: true
}

export async function createCarAction(prevState: CreateCarActionState, formData: FormData): Promise<CreateCarActionState> {

    const isAuthenticated = await verifyLoginSession()
    
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
    
    const zodParsedObj = CarCreateSchema.safeParse(formDataToObj)

    if(!zodParsedObj.success) {
        const errors = getZodErrorMessages(zodParsedObj.error.format())
        return {
            errors,
            formState: makePartialPublicCar(formDataToObj)
        }
    }

    if (!isAuthenticated) {
        return {
            formState: makePartialPublicCar(formDataToObj),
            errors: ['Não autenticado.']
        }
    }

    const validCarData = zodParsedObj.data
    const newCar: CarModel = {
        ...validCarData,
        images: JSON.stringify(validCarData.images),
        id: uuidV4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    try {
        await carRepository.create(newCar)
    } catch(e: unknown) {
        if(e instanceof Error) {
            return {
                formState: newCar,
                errors: [e.message]
            }
        }

        return {
            formState: newCar,
            errors: ['Erro desconhecido'] 
        }
    }

    updateTag('cars')
    redirect(`/admin/car/${newCar.id}?created=1`)

}