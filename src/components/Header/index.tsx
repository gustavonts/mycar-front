'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname() 
    const showLogin = pathname === "/" || pathname.startsWith("/car/")
    
    return (
        <header className="flex justify-between items-center px-6 py-4">
            <h1 className="
                text-3xl/normal font-extrabold
                sm:text-4xl/normal sm:py-10 
                md:text-5xl/normal md:py-11 
                lg:text-6xl/normal lg:py-12">
                <Link href="/">Car Sale</Link>
            </h1>

            {showLogin && (
                <nav>
                    <Link 
                        href="/login" 
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        Login
                    </Link>
                </nav>
            )}
        </header>
    )
}