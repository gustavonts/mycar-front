'use client'

import { Button } from "@/components/Button";
import { InputText } from "@/components/inputs/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { InputCheckbox } from "@/components/inputs/InputCheckbox";
import { PublicCar } from "@/dto/car/dto";

type ManageCarFormProps = {
    publicCar?: PublicCar
}

export function ManageCarForm({publicCar}: ManageCarFormProps) {

    const [contentValue, setContentValue] = useState(publicCar?.description || '')

    return (
        <form action="" className="mb-16">
            <div className="flex flex-col gap-6">
                
                <InputText labelText="ID" name='id' placeholder="ID gerado automaticamente" type="text" defaultValue={publicCar?.id || ''} readOnly/>

                <InputText labelText="FipeCode" name='fipeCode' placeholder="ID da tabela Fipe" type="text" defaultValue={publicCar?.fipeCode || ''} readOnly/>

                <InputText labelText="Marca" name='brand' placeholder="Digite a marca do veículo" type="text" defaultValue={publicCar?.brand || ''}/>

                <MarkdownEditor labelText="Descrição" value={contentValue} setValue={setContentValue} textAreaName="content" disabled={false}/>

                <ImageUploader />

                <InputText labelText="URL da imagem de capa" name='coverImageUrl' placeholder="Digite a url da imagem" type="text" defaultValue={publicCar?.images || ''}/>

                <InputCheckbox  labelText="Ativo?" name='active'  type="checkbox" defaultValue={''} defaultChecked={publicCar?.active || true}/>

                <div className="mt-4">
                    <Button type="submit" size="md" className="w-full">Enviar</Button>
                </div>
            </div>
        </form>
    )
}