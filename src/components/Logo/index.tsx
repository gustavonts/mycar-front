import Link from "next/link"

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <svg 
                        width="28" 
                        height="28" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                    >
                        <path 
                            d="M5 11L6.5 6.5H17.5L19 11M5 11H3M5 11H19M19 11L20.5 15.5H3.5L5 11M9 18.5C9.82843 18.5 10.5 17.8284 10.5 17C10.5 16.1716 9.82843 15.5 9 15.5C8.17157 15.5 7.5 16.1716 7.5 17C7.5 17.8284 8.17157 18.5 9 18.5Z" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            fill="none"
                        />
                        <path 
                            d="M15 18.5C15.8284 18.5 16.5 17.8284 16.5 17C16.5 16.1716 15.8284 15.5 15 15.5C14.1716 15.5 13.5 16.1716 13.5 17C13.5 17.8284 14.1716 18.5 15 18.5Z" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </svg>
                </div>
            </div>
            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-purple-700 transition-all duration-300">
                Car Sale
            </span>
        </Link>
    )
}

