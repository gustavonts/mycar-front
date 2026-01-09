'use server'

import { createLoginSessionFromApi } from "@/lib/login/manage-login";
import { LoginSchemas } from "@/lib/login/schemas";
import { apiRequest } from "@/utils/api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { verifyHoneypotInput } from "@/utils/verify-honeypot-input";
import { redirect } from 'next/navigation'
import { success } from "zod";

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
    
    const isBot = await verifyHoneypotInput(formData)

    if (isBot) {
        return {
            email: '',
            errors: ['nice'],
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
    const parsedFormData = LoginSchemas.safeParse(formData)

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

    await createLoginSessionFromApi(loginResponse.data.accessToken)
    redirect(`/admin/car`)
    
}