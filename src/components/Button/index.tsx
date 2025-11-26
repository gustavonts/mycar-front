type ButtonVariants = 'default' | 'ghost' | 'danger'
type ButtonSizes = 'sm' | 'md' | 'lg'

type ButtonProps = {
    variant?: ButtonVariants
    size?: ButtonSizes
} & React.ComponentProps<'button'>

export function Button( {variant = 'default', size = 'md', ...props}: ButtonProps) {
    const buttonVariants = {
        default: `bg-blue-600 text-blue-100 hover:bg-blue-700`,
        ghost: `bg-slate-200 text-slate-900 hover:bg-slate-300`,
        danger: `bg-red-600 text-red-100 hover:bg-red-700`
    }

    const buttonSizes = {
        sm: `text-xs/tight py-1 px-2 rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1`,
        md: `text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2`,
        lg: `text-lg/tight py-4 px-6 rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3`
    }

    const buttonClasses = `${buttonVariants[variant]} ${buttonSizes[size]} 
        flex items-center justify-center cursor-pointer transition 
        disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed ${props.className}`
    return (
        <button {...props} className={buttonClasses} />
    )
}