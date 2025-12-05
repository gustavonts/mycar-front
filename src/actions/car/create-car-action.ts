'use server'

import { makePartialPublicCar, PublicCar } from "@/dto/car/dto"
import { CarCreateSchema } from "@/lib/car/validations"
import { CarModel } from "@/models/car/car-model"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { error } from "console"

type createCarActionState = {
    formState: PublicCar
    errors: string[]
}

export async function createCarAction(prevState: createCarActionState, formData: FormData): Promise<createCarActionState> {
    
    if(!(formData instanceof FormData)) {
        return  {
            formState: {
                ...prevState.formState,
            },
            errors: ['Dados Inválidos']
        }
    }


    console.log(Object.fromEntries(formData.entries()));

<<<<<<< HEAD
    // Normalizar FormData para objeto, tratando campos vazios
    const formDataToObj: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
        // Se o valor for uma string vazia, manter como string vazia (não undefined)
        formDataToObj[key] = value
    }
    
=======

    const formDataToObj = Object.fromEntries(formData.entries())
>>>>>>> b9c56a4a1dbe461e6b802d706d14e01382fec5bc
    const zodParsedObj = CarCreateSchema.safeParse(formDataToObj)

    if(!zodParsedObj.success) {
        const errors = getZodErrorMessages(zodParsedObj.error.format())
        return {
            errors,
            formState: makePartialPublicCar(formDataToObj)
        }
    }

    const validCarData = zodParsedObj.data
    const newCar: CarModel = {
        ...validCarData,
        images: [],
        id: Date.now().toString(),
        fipeCode: Math.random().toString(4),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    return  {
        formState: newCar,
        errors: []
    }
}