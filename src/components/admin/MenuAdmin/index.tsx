import { Link } from "lucide-react";

export default function MenuAdmin() {
    return (
        <nav>
            <a href="/" target="_blank">Home</a>
            <Link href="/admin/post">Cars</Link>
        </nav>
    )
}