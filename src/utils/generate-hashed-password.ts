import { hashPassword } from "@/lib/login/manage-login"

(async () => {
    const minhaSenha = '123456'
    const hashDaSuaSenhaEmBase64 = hashPassword(minhaSenha)
    console.log(hashDaSuaSenhaEmBase64)
})