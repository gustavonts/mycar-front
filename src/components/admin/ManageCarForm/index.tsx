'use client'

import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/inputs/InputCheckbox";
import { InputText } from "@/components/inputs/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";

export function ManageCarForm() {

    const [contentValue, setContentValue] = useState('Este é um exemplo')

    return (
        <form action="" className="mb-16">
            <div className="flex flex-col gap-6">
                
                <InputText labelText="Nome" placeholder="Digite seu nome" id={'nome'}/>

                <ImageUploader />

                <MarkdownEditor labelText="Conteúdo" disabled={false} textAreaName="content" value={contentValue} setValue={setContentValue}/>

                <InputCheckbox labelText="Input Teste"/>
                <div className="mt-4">
                    <Button type="submit" size="md" className="w-full">Enviar</Button>
                </div>
            </div>
        </form>
    )
}