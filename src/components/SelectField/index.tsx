import { useId } from "react"

type SelectFieldProps = {
  labelText?: string
  options: {
    label: string
    value: string
  }[]
} & React.ComponentProps<'select'>

export function SelectField({
  labelText = '',
  options,
  ...props
}: SelectFieldProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label htmlFor={id} className="text-sm">
          {labelText}
        </label>
      )}

      <select
        {...props}
        id={id}
        className={`bg-white outline-0 ring-2 ring-slate-400 rounded p-2 text-base/tight transition
          focus:ring-blue-600 placeholder-slate-300
          disabled:bg-slate-200 disabled:text-slate-400
          ${props.className}`}
      >
        <option value="">Selecione</option>

        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
