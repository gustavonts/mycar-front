'use server'

import { CreateUserSchema, PublicUserDto, PublicUserSchema } from "@/lib/user/schemas"
import { apiRequest } from "@/utils/api-request"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { redirect } from 'next/navigation'

type CreateUserActionState = {
    user: PublicUserDto
    errors: string[]
    sucess: boolean
}

export async function createUserAction(state: CreateUserActionState, formData: FormData): Promise<CreateUserActionState>{
    if(!(formData instanceof FormData)) {
        return {
            user: state.user,
            errors: ['Dados inválidos'],
            sucess: false
        }
    }

    const formObj = Object.fromEntries(formData.entries())
    const parsedFormData = CreateUserSchema.safeParse(formData)

    if(!parsedFormData.success) {
        return {
            user: PublicUserSchema.parse(formData),
            errors: getZodErrorMessages(parsedFormData.error.format()),
            sucess: false
        }
    }

    const createResponse = await apiRequest<PublicUserDto>('/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedFormData.data)
    })

    if(!createResponse.success) { 
        return {
            user: PublicUserSchema.parse(formObj),
            errors: createResponse.errors,
            sucess: createResponse.success
        }
    }

    redirect('/login?created=1')
}