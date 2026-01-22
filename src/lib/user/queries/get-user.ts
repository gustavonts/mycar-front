import { authenticatedApiRequest } from "@/utils/authenticated-api-request"
import { PublicUserDto, PublicUserSchema } from "../schemas"

export async function getPublicUserFromApi(): Promise<PublicUserDto | undefined> {
    const userResponse = await authenticatedApiRequest<PublicUserDto>(
        `/user/me`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    console.log('USER:', userResponse)


    if (!userResponse.success) {
        return undefined
    }

    const parsed = PublicUserSchema.safeParse(userResponse.data)

    if (!parsed.success) {
        console.error('Erro ao validar usuário:', parsed.error)
        return undefined
    }

    return parsed.data
}

export const findAllUsersFromApiAdmin = async () => {
    const usersResponse = await authenticatedApiRequest<PublicUserDto[]> (
        `/user/all/users`,
    
        {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        }
    )

    return usersResponse
}
