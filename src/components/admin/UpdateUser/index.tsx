import ErrorMessage from "@/components/ErrorMessage"
import { UpdateUserForm } from "@/components/admin/UpdateUserForm"
import { getPublicUserFromApi } from "@/lib/user/api/get-user"

export default async function UpdateUser() {
    const user = await getPublicUserFromApi()
    console.log(user)

    if(!user) {
        return (
            <ErrorMessage 
                contentTitle=':('
                content='Você precisa fazer login novamente.'
            />
        )
    }

    return <UpdateUserForm user={user} />
}