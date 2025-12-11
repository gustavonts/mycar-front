import { hashPassword } from "@/lib/login/manage-login"

;(async () => {
    const senha = "123456"
    const hash = await hashPassword(senha)

    console.log(hash)
})()
