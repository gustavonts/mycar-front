import { useId } from "react"

type InputTextProps = {
    labelText?: string
} & React.ComponentProps<'input'>

export function InputText({labelText = '', ...props}: InputTextProps) {

    const id = useId()

    return (
        <div className="flex flex-col gap-2">
            {labelText && <label htmlFor={id} className="text-sm">{labelText}</label>}
           <input {...props}  
            className={`bg-white outline-0 ring-2 ring-slate-400 rounded p-2 text-base/tight transition focus:ring-blue-600 placeholder-slate-300 
                disabled:bg-slate-200 disabled:placeholder-slate-300 disabled:text-slate-400
                read-only:bg-slate-100
                ${props.className}`} 
            id={id}/> 
        </div>
    )
}