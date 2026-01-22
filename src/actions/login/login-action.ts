'use server'

import { UserStatusDto } from "@/dto/user/dto";
import { createLoginSessionFromApi } from "@/lib/login/manage-login";
import { LoginSchemas } from "@/lib/login/schemas";
import { apiRequest } from "@/utils/api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from 'next/navigation'

type LoginActionState = {
    email: string,
    errors: string[]
}

export async function loginAction(state: LoginActionState, formData: FormData) {
    const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN))
 

    if(!allowLogin) {
        return {
            email: '',
            errors: ['Login not allowed']
        }
    }

    if(!(formData instanceof FormData)) {
        return {
            email: '',
            errors: ['Dados Inválidos']
        }
    }

    const formObj = Object.fromEntries(formData.entries())
    const formEmail = formObj?.email?.toString() || ''
    const parsedFormData = LoginSchemas.safeParse({
        email: formObj.email ?? '',
        password: formObj.password ?? ''
    })

    const userStatusResponse = await apiRequest<UserStatusDto>(
        `/user/${formEmail}`
    )

    if (!userStatusResponse.success) {
        return {
            email: formEmail,
            errors: userStatusResponse.errors
        }
    }

    if (!userStatusResponse.data.active) {
        return {
            email: formEmail,
            errors: ['Usuário desativado']
        }
    }

    if(!parsedFormData.success) {
        return {
            email: formEmail,
            errors: getZodErrorMessages(parsedFormData.error.format()),
        }
    }

    const loginResponse = await apiRequest<{accessToken: string}>('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedFormData.data)
    })

    if(!loginResponse.success) { 
        return {
            email: formEmail,
            errors: loginResponse.errors,
        }
    }

    console.log(loginResponse.data)
    console.log('LOGIN RESPONSE COMPLETA:', loginResponse)

    await createLoginSessionFromApi(loginResponse.data.accessToken)

    redirect(`/admin/car`)
    
}