import { PublicUserDto } from "@/lib/user/schemas"

export type CarModelFromApi = {
    id: string
    brand: string
    model: string
    version: string
    year: string
    plate: string | null
    fuel: string
    price: string
    mileage: string
    color: string
    description: string
    images: string;
    active: boolean
    user: PublicUserDto
    createdAt: string
    updatedAt: string
}