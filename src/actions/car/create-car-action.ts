'use server'

import { PublicCar } from "@/dto/car/dto"
import { error } from "console"

type createCarActionState = {
    formState: PublicCar
    error: string[]
}

export async function createCarAction(prevState: createCarActionState, formData: FormData): Promise<createCarActionState> {
    console.log({prevState})
    console.log(formData)
    return  {
        formState: prevState.formState,
        errors: []
    }
}