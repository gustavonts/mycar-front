'use client'

import { CarFrontIcon, CarIcon, CircleXIcon, FileTextIcon, HouseIcon, MenuIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenuAdmin() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])
    
    const navClasses = `
        bg-slate-900 text-slate-100 rounded-lg flex flex-col mb-8
        sm:flex-row sm:flex-wrap
        ${isOpen ? 'h-auto' : 'h-10 overflow-hidden'}
        sm:overflow-visible sm:h-auto`;

    const linkClasses = '[&_svg]:w-[16px] [&_svg]:h-[16px] px-4 flex items-center justify-start gap-2 rounded-lg hover:bg-slate-800 transition h-10 shrink-0 cursor-pointer'

    const openCloseBtnClasses = `text-blue-200 italic sm:hidden ${linkClasses}`

    return (
        <nav className={navClasses}>
            <button onClick={() => setIsOpen(s => !s)} className={openCloseBtnClasses}>
                {!isOpen && (
                    <>
                        <MenuIcon />
                        Menu
                    </>
                )}
                {isOpen && ( 
                    <>
                        <CircleXIcon />
                        Fechar
                    </>
                )}
            </button>

            <a href="/" target="_blank" className={linkClasses}>
                <HouseIcon />
                Home
            </a>
            <Link href="/admin/car" className={linkClasses}>
                <CarFrontIcon />
                Cars
            </Link>
            <Link href="/admin/car/new" className={linkClasses}>
                <PlusIcon />
                Criar Veículo
            </Link>
        </nav>
    )
}