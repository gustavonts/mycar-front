import { Logo } from "../Logo"

export function Header() {
    return (
        <header className="mb-8">
            <div className="py-6 sm:py-8 md:py-10">
                <Logo />
            </div>
        </header>
    )
}