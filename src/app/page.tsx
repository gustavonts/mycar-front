import { CarsList } from "@/components/CarsList"
import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import { SpinLoader } from "@/components/SpinLoader"
import Link from "next/link"
import { Suspense } from "react"
import Image from "next/image"
import CarHeading from "@/components/CarHeading"
import CarCoverImage from "@/components/CarCoverImage"

export default async function HomePage() {
  return (
    <Container>
      <Header />

        <section className="
          grid grid-cols-1 gap-8 mb-16
          sm:grid-cols-2
          group">
          <CarCoverImage 
            linkProps={
              {
                href: '#'
              }
            } 
            imageProps={
              {
                width: 1200,
                height: 720,
                src: "/images/focus.png",
                alt: 'Alt da Imagem',
                priority: true
              }
              } />
          <div className="flex flex-col gap-4 sm:justify-center">
            <time className="text-slate-600 text-sm/tight" dateTime="2025-11-20">04/11/2025 10:00</time>
            <CarHeading url="#" as='h1'>Ford Focus</CarHeading>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quis ipsum dolores ad ipsa maiores aut atque itaque earum. Numquam culpa saepe minus, reiciendis quaerat ea nemo commodi inventore vel!
            </p>
          </div>
        </section>

        <Suspense fallback={<SpinLoader/>}>
          <CarsList />
        </Suspense>
      <footer>
        <h1>Aqui é a Footer</h1>
      </footer>
    </ Container>
  )
}
