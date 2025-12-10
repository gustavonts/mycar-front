import { asyncDelay } from "@/utils/async-delay";

type LoginActionState = {
    username: string,
    error: string
}

export async function loginAction(state: LoginActionState, formData: FormData) {
    await asyncDelay(3000)

    return {
        username: '',
        error: ''
    }
}