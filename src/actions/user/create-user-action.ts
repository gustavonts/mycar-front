'user server'

import { CreateUserSchema, PublicUserDto, PublicUserSchema } from "@/lib/user/schemas"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"

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

    return {
        user: state.user,
        errors: [''],
        sucess: true
    }
}