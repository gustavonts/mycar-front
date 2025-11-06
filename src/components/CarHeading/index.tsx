import Link from "next/link";

type CarHeadingProps = {
    children: React.ReactNode
    url: string
    as: 'h1' | 'h2'
}

export default function CarHeading({children, url, as: Tag = 'h2'}: CarHeadingProps) {
    const headingClassesMap = {
        h1: "text-2xl/tight font-extrabold sm:text-4xl/tight sm:font-extrabold",
        h2: "text-2xl/tight font-extrabold sm:text-4xl/tight sm:font-extrabold"
    }
    return (
        <Tag className={headingClassesMap[Tag]}>
            <Link href={url}>{children}</Link>
        </Tag>
    )
}