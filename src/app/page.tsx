import { CarsList } from "@/components/CarsList"
import { Container } from "@/components/Container"
import { Header } from "@/components/Header"
import { SpinLoader } from "@/components/SpinLoader"
import Link from "next/link"
import { Suspense } from "react"
import Image from "next/image"
import CarHeading from "@/components/CarHeading"
import CarCoverImage from "@/components/CarCoverImage"
import { CarFeatured } from "@/components/CarFeatured"

export default async function HomePage() {
  return (
    <Container>
      <Header />
        <Suspense fallback={<SpinLoader/>}>
          <CarFeatured />
        </Suspense>
        
        <Suspense fallback={<SpinLoader/>}>
          <CarsList />
        </Suspense>
      <footer>
        <h1>Aqui é a Footer</h1>
      </footer>
    </ Container>
  )
}
