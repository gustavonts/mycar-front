'use server'

import { drizzleDb } from "@/db/drizzle"
import { carsTable } from "@/db/drizzle/schemas"
import { carRepository } from "@/repositories/car"
import { eq } from "drizzle-orm/sqlite-core/expressions"
import { revalidateTag } from "next/cache"

export async function deleteCarAction(id: string ) {

    if(!id || typeof id !== 'string') {
        return {
            error: 'Dados inválidos'
        }
    }

    const car = await carRepository.findById(id).catch(() => undefined)

    if(!car) {
        return {
            error: 'Carro não existe'
        }
    }

    await drizzleDb.delete(carsTable).where(eq(carsTable.id, id))

    revalidateTag('cars', 'default')
    revalidateTag(`car-${id}`, 'default')

    return {
        error: ''
    }
}