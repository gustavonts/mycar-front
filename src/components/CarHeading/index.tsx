import Link from "next/link";

type CarHeadingProps = {
    children: React.ReactNode
    url: string
    as: 'h1' | 'h2'
}

export default function CarHeading({children, url, as: Tag = 'h2'}: CarHeadingProps) {
    const headingClassesMap = {
        h1: "text-2xl/tight sm:text-4xl/tight font-extrabold",
        h2: "text-2xl/tight font-bold"
    }
    return (
        <Tag className={headingClassesMap[Tag]}>
            <Link className='group-hover:opacity-80 transition-opacity' href={url}>{children}</Link>
        </Tag>
    )
}