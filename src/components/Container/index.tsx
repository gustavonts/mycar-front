type ContainerProps = {
    children: React.ReactNode
}

export function Container({children} : ContainerProps) {
    return (
        <div className="text-slate-900 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 min-h-screen dark:text-slate-100 dark:bg-slate-900 py-8">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    )
}