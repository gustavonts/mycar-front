import Link from "next/link"
import ErrorMessage from "../../ErrorMessage"
import { findAllUsersFromApiAdmin } from "@/lib/user/queries/get-user"

export default async function UserListAdmin() {
    const usersRes = await findAllUsersFromApiAdmin()

    if (!usersRes.success) {
        console.log(usersRes.errors)
        return (
            <ErrorMessage contentTitle="Ei :D" content='Tente fazer login novamente!' />
        )
    }
    
    const users = usersRes.data

    if(users.length <= 0) return <ErrorMessage contentTitle={"Ei "} content={"Crie algum usuário!"} />
    
    return <div className="mb-16">
        {users.map(user => {
            return (
                <Link href={`/admin/user/${user.id}`} key={user.id} className={`py-2 px-2 ${user.active ? '' : 'bg-slate-300'} flex gap-2 items-center justify-between bg-slate-200 rounded m-1 hover:bg-slate-300 hover:cursor-pointer`}> 
                    <div >
                        {user.id} - {user.name} - {user.email}
                        {!user.active && <span className="text-xs text-slate-600 italic"> Inativo</span>}
                    </div>
                </Link>
            )
        })}
    </div>
}