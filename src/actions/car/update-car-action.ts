'use server'

import { makePartialPublicCar, makePublicCarFromDb, PublicCar } from "@/dto/car/dto"
import { CarUpdateSchema } from "@/lib/car/validations"
import { requireLoginSessionOrRedirect, verifyLoginSession } from "@/lib/login/manage-login"
import { carRepository } from "@/repositories/car"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { updateTag } from 'next/cache'

type UpdateCarActionState = {
    formState: PublicCar
    errors: string[]
    sucess?: true
}

export async function updateCarAction(prevState: UpdateCarActionState, formData: FormData): Promise<UpdateCarActionState> {

    const isAuthenticated = await verifyLoginSession()


    
    
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

    const formDataToObj: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
        formDataToObj[key] = value
    }
    
    const zodParsedObj = CarUpdateSchema.safeParse(formDataToObj)

    if (!isAuthenticated) {
        return {
            formState: makePartialPublicCar(formDataToObj),
            errors: ['Não autenticado.']
        }
    }

    if(!zodParsedObj.success) {
        const errors = getZodErrorMessages(zodParsedObj.error.format())
        return {
            errors,
            formState: makePartialPublicCar(formDataToObj)
        }
    }

    const validCarData = zodParsedObj.data
    const newCar = {
        ...validCarData,
    };

    let car

    try {
        car = await carRepository.update(id, newCar)
    } catch(e: unknown) {
        if(e instanceof Error) {
            return {
                formState: makePartialPublicCar(formDataToObj),
                errors: [e.message]
            }
        }

        return {
            formState: makePartialPublicCar(formDataToObj),
            errors: ['Erro desconhecido'] 
        }
    }

    updateTag('cars')

    return {
        formState: makePublicCarFromDb(car),
        errors: [],
        sucess: true
    }
}