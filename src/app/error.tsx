'use client'

import ErrorMessage from "@/components/ErrorMessage";
import { useEffect } from "react";

type RootErroPageProps = {
    error: Error,
    reset: () => void
}

export default function RootErroPage({error, reset}: RootErroPageProps ) {
    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <ErrorMessage 
            pageTitle={"Internal Server Error"} 
            contentTitle={"501"} 
            content={"Ocorreu um erro do qual nossa aplicação não conseguiu se recuperar. Tente novamente mais tarde!"} />
    )
}