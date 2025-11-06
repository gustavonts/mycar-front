import Link from "next/link";

export default function Footer() {
    return (
        <footer className="pb-16 text-center">
            <p className="py-8">Copyright &copy; {new Date().getFullYear()} - {' '} <Link href={'/'}>Car Sale</Link></p>
        </footer>
    )
}