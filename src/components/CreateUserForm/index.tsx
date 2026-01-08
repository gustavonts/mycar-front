import { InputText } from "../inputs/InputText";
import { Link, UserRoundIcon } from "lucide-react";
import { Button } from "../Button";
import { useActionState, useEffect } from "react";
import { createUserAction } from "@/actions/user/create-user-action";
import { PublicUserSchema } from "@/lib/user/schemas";
import { toast } from "react-toastify";

export function CreateUserForm() {

    const [state, action, isPending] = useActionState(createUserAction, {
        user: PublicUserSchema.parse({}),
        errors: [],
        sucess: false
    })

    useEffect(() => {
        toast.dismiss()
        if (state.errors.length > 0) {
            state.errors.forEach(error => toast.error(error))
        }
    }, [state])
    return (
        <div className={'flex items-center justify-center text-center max-w-sm mt-16 mb-32 mx-auto'}>
            <form action={action} className="flex-1 flex flex-col gap-6">
                <InputText 
                    type="text"
                    name="name"
                    labelText="Nome"
                    placeholder="Seu Nome"
                    disabled={isPending}
                    defaultValue={state.user.name}
                    required    
                />
                <InputText 
                    type="email"
                    name="email"
                    labelText="E-mail"
                    placeholder="Seu e-mail"
                    disabled={isPending}
                    defaultValue={state.user.email}
                    required    
                />
                <InputText 
                    type="password"
                    name="email"
                    labelText="Senha"
                    placeholder="Digite sua senha"
                    disabled={isPending}
                    required    
                />
                <InputText 
                    type="password2"
                    name="password2"
                    labelText="Repetir senha"
                    placeholder="Digite sua senha novamente"
                    disabled={isPending}
                    required    
                />
                <Button disabled={isPending} type='submit' className='mt-4'>
                    <UserRoundIcon />
                    {!isPending && 'Criar Conta'}   
                    {isPending && 'Criando...'}
                </Button>
                <p className="text-sm/tight">
                    <Link href="/login">Já tem conta? Entrar</Link>
                </p>
            </form>
        </div>

    )
}