'use server'

import { CreateUserSchema, PublicUserDto } from "@/lib/user/schemas"
import { apiRequest } from "@/utils/api-request"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { redirect } from 'next/navigation'

type CreateUserFormState = {
    name: string
    email: string
    password: string
    password2: string
}

type CreateUserActionState = {
    user: CreateUserFormState
    errors: string[]
    success: boolean
}

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData
): Promise<CreateUserActionState> {

    const formObj = Object.fromEntries(formData.entries())

    const parsedFormData = CreateUserSchema.safeParse(formObj)

    if (!parsedFormData.success) {
        return {
            user: {
                name: String(formObj.name ?? ''),
                email: String(formObj.email ?? ''),
                password: '',
                password2: ''
            },
            errors: getZodErrorMessages(parsedFormData.error.format()),
            success: false
        }
    }

    const createResponse = await apiRequest<PublicUserDto>('/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedFormData.data)
    })

    if (!createResponse.success) { 
        return {
            user: {
                ...parsedFormData.data,
                password2: ''
            },
            errors: createResponse.errors,
            success: false
        }
    }

    redirect('/login?created=1')
}