'use client'

type DialogProps = {
    isVisible?: boolean
    title: string
    content: React.ReactNode
}

export function Dialog({isVisible = false, title, content}: DialogProps) {
    if (!isVisible) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50" 
            role="dialog" 
            aria-modal={true} 
            aria-labelledby="dialog-title" 
            aria-describedby="dialog-description">
            <div className="bg-sky-100 p-6 rounded-lg max-w-2xl mx-6 flex flex-col gap-6 shadow-lg shadow-black/30 text-center">
                <h3 id='dialog-title' className="font-xl font-extrabold">{title}</h3>
                <div id='dialog-description'>
                    {content}
                </div>
                <div className="flex items-center justify-around">
                    <button 
                        className="bg-slate-300 text-slate-950 hover:bg-slate-400 transition flex items-center justify-center py-2 px-4 rounded-lg cursor-pointer"
                        autoFocus>
                        cancelar
                    </button>
                    <button
                        className="bg-blue-500 text-slate-100 hover:bg-blue-50 transition flex items-center justify-center py-2 px-4 rounded-lg cursor-pointer"
                        autoFocus>
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}