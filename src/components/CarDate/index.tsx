import { formatDatetime, formatRelativeDate } from "@/utils/format-datetime"

type CarDateProps = {
    dateTime: string
}

export function CarDate({dateTime} : CarDateProps) {
    return (
        <time className="text-slate-600 text-sm/tight" dateTime={dateTime}>
            {formatDatetime(dateTime)} - {formatRelativeDate(dateTime)}
        </time>
    )
}