'use server'

import { makePartialPublicCar, PublicCar } from "@/dto/car/dto"
import { CarCreateSchema } from "@/lib/car/validations"
import { CarModel } from "@/models/car/car-model"
import { carRepository } from "@/repositories/car"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { revalidateTag, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { v4 as uuidV4 } from "uuid"

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

    // Normalizar FormData para objeto, tratando campos vazios
    const formDataToObj: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
        // Se o valor for uma string vazia, manter como string vazia (não undefined)
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

    const validCarData = zodParsedObj.data
    const newCar: CarModel = {
        ...validCarData,
        images: JSON.stringify(validCarData.images),
        id: uuidV4(),
        fipeCode: Math.random().toString(4),
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
    redirect(`/admin/car/${newCar.id}`)

}