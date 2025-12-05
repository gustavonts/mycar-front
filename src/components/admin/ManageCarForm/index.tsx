'use client'

import { Button } from "@/components/Button";
import { InputText } from "@/components/inputs/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { InputCheckbox } from "@/components/inputs/InputCheckbox";
import { makePartialPublicCar, PublicCar } from "@/dto/car/dto";
import { createCarAction } from "@/actions/car/create-car-action";
import { error } from "console";
import { toast } from "react-toastify";

type ManageCarFormProps = {
    publicCar?: PublicCar
}

export function ManageCarForm({publicCar}: ManageCarFormProps) {

    const initialState = {
        formState: makePartialPublicCar(publicCar),
        errors: []
    }
    const [state, action, insPending] = useActionState(
        createCarAction,
        initialState
    )

    useEffect(() => {
        if (state.errors.length > 0) {
            toast.dismiss()
            state.errors.forEach(error => toast.error(error))
        }
    }, [state.errors])

    const { formState } = state
    const [contentValue, setContentValue] = useState(publicCar?.description || '')

    return (
        <form action={action} className="mb-16" encType="multipart/form-data">
            <div className="flex flex-col gap-6">
                
                <InputText labelText="ID" name='id' placeholder="ID gerado automaticamente" type="text" defaultValue={formState.id} readOnly/>

                <InputText labelText="FipeCode" name='fipeCode' placeholder="ID da tabela Fipe" type="text" defaultValue={formState.fipeCode} readOnly/>

                <InputText labelText="Marca" name='brand' placeholder="Digite a marca do veículo" type="text" defaultValue={formState.brand}/>

                <InputText labelText="Modelo" name='model' placeholder="Digite o modelo do veículo" type="text" defaultValue={formState.model}/>

                <InputText labelText="Versão" name='version' placeholder="Digite a versão do veículo" type="text" defaultValue={formState.version}/>

                <InputText labelText="Ano" name='year' placeholder="Digite o ano do veículo" type="text" defaultValue={formState.year}/>

                <InputText labelText="Placa" name='plate' placeholder="Digite a placa do veículo" type="text" defaultValue={formState.plate ?? ""}/>

                <InputText labelText="Combustível" name='fuel' placeholder="Digite o tipo de combustível do veículo" type="text" defaultValue={formState.fuel}/>

                <InputText labelText="Preço" name='price' placeholder="Digite o preço do veículo" type="text" defaultValue={formState.price}/>

                <InputText labelText="Quilometragem" name='mileage' placeholder="Digite a quilometragem do veículo" type="text" defaultValue={formState.mileage}/>

                <InputText labelText="Usuário" name='user' placeholder="usuário" type="text" defaultValue={formState.user}/>

                <InputText labelText="Cor" name='color' placeholder="Digite a cor do veículo" type="text" defaultValue={formState.color}/>

                <MarkdownEditor labelText="Descrição" value={contentValue} setValue={setContentValue} textAreaName="description" disabled={false}/>

                <ImageUploader />

                <InputCheckbox  labelText="Ativo?" name='active'  type="checkbox" defaultChecked={formState.active || false}/>

                <div className="mt-4">
                    <Button type="submit" size="md" className="w-full">Enviar</Button>
                </div>
            </div>
        </form>
    )
}

