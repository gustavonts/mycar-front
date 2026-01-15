'use client'

import { logoutAction } from "@/actions/login/logout-action";
import { CarFrontIcon, CircleXIcon, Edit3Icon, HourglassIcon, HouseIcon, LogOutIcon, MenuIcon, PlusIcon, SquareRoundCornerIcon, UserPenIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function MenuAdmin() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

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

    function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault()

        startTransition(async () => {
            await logoutAction()
        })
    }

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
                Carros
            </Link>
            <Link href="/admin/car/new" className={linkClasses}>
                <PlusIcon />
                Criar Veículo
            </Link>
            <Link href="/admin/user" className={linkClasses}>
                <UserPenIcon />
                Meus dados
            </Link>
            <Link href="/admin/user/password" className={linkClasses}>
                <Edit3Icon />
                Alterar Senha
            </Link>

            <a onClick={handleLogout} href="#" className={linkClasses}>
                {isPending && (
                    <>
                        <HourglassIcon />
                        Aguarde...
                    </>
                )}

                {!isPending && (
                    <>
                        <LogOutIcon />
                        Sair
                    </>
                )}    
            </a>
        </nav>
    )
}