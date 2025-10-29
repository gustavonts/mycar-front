import { CarsList } from "@/components/CarsList"
import { Header } from "@/components/Header"
import { SpinLoader } from "@/components/SpinLoader"
import { carRepository } from "@/repositories/car/json-car-repository"
import { Suspense } from "react"

export default async function HomePage() {
  return (
    <div>
      <header>
        <h1>Aqui é a Header</h1>
      </header>
        <Suspense fallback={<SpinLoader/>}>
          <CarsList />
        </Suspense>
      <footer>
        <h1>Aqui é a Footer</h1>
      </footer>
    </div>
  )
}
