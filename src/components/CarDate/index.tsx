import { formatDatetime, formatRelativeDate } from "@/utils/format-datetime"

type CarDateProps = {
    dateTime: string
}

export function CarDate({dateTime} : CarDateProps) {
    return (
        <time className="text-sm/tight text-gray-400" dateTime={dateTime}>
            {formatDatetime(dateTime)} - Anunciado {formatRelativeDate(dateTime)}
        </time>
    )
}