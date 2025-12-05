export type CarModel = {
    id: string
    fipeCode: string
    brand: string
    model: string
    version: string
    year: string
    plate?: string | null
    fuel: string
    price: string
    mileage: string
    color: string
    description: string
    images: string | string[];
    active: boolean
    user: string
    createdAt: string
    updatedAt: string
}