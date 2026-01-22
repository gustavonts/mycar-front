'use client'

import { Button } from "@/components/Button";
import { InputText } from "@/components/inputs/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useActionState, useEffect, useState } from "react";
import { ImageUploader } from "../ImageUploader";
import { InputCheckbox } from "@/components/inputs/InputCheckbox";
import { createCarAction } from "@/actions/car/create-car-action";
import { toast } from "react-toastify";
import { updateCarAction } from "@/actions/car/update-car-action";
import { useRouter, useSearchParams } from "next/navigation";
import { PublicCarForApiDto, PublicCarForApiSchema } from "@/lib/car/schemas";
import { SelectField } from "@/components/SelectField";

type ManageCarFormUpdateProps = {
    mode: 'update'
    publicCar: PublicCarForApiDto
}

type ManageCarFormCreateProps = {
    mode: 'create'
}

type ManageCarFormProps = 
    | ManageCarFormUpdateProps | ManageCarFormCreateProps

export function ManageCarForm(props: ManageCarFormProps) {

    const {mode} = props
    const searchParams = useSearchParams()
    const created = searchParams.get('created')
    const router = useRouter()

    let publicCar

    if(mode === 'update') {
        publicCar = props.publicCar
    }

    const actionsMap = {
        update: updateCarAction,
        create: createCarAction
    }

    const initialState = {
        formState: PublicCarForApiSchema.parse(publicCar || {}),
        errors: []
    }
    
    const [state, action, isPending] = useActionState(
        actionsMap[mode],
        initialState
    )

    useEffect(() => {
        if (state.errors.length > 0) {
            toast.dismiss()
            state.errors.forEach(error => toast.error(error))
        }
    }, [state.errors])

    useEffect(() => {
        if (state.success) {
            toast.dismiss()
            toast.success('Carro atualizado com sucesso')
        }
    }, [state])

    useEffect(() => {
        if (created === '1') {
            toast.dismiss()
            toast.success('Carro criado com sucesso')
            const url = new URL(window.location.href)
            url.searchParams.delete('created')
            router.replace(url.toString())
        }
    }, [created, router])

    const { formState } = state
    const [contentValue, setContentValue] = useState(publicCar?.description || '')

    return (
        <form action={action} className="mb-16">
            <div className="flex flex-col gap-6">
                
                <InputText labelText="ID" name='id' placeholder="ID gerado automaticamente" type="text" defaultValue={formState.id} readOnly disabled={isPending}/>

                <InputText labelText="Marca" name='brand' placeholder="Digite a marca do veículo" type="text" defaultValue={formState.brand} disabled={isPending}/>

                <InputText labelText="Modelo" name='model' placeholder="Digite o modelo do veículo" type="text" defaultValue={formState.model} disabled={isPending}/>

                <InputText labelText="Versão" name='version' placeholder="Digite a versão do veículo" type="text" defaultValue={formState.version} disabled={isPending}/>

                <InputText
                    labelText="Ano"
                    placeholder="Digite o ano do veículo"
                    name="year"
                    type="text"
                    defaultValue={formState.year}
                    inputMode="numeric"
                    disabled={isPending}
                    maxLength={4}
                    onChange={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                    }}
                />

                <InputText labelText="Placa" name='plate' placeholder="Digite a placa do veículo" type="text" maxLength={8} defaultValue={formState.plate ?? ""} disabled={isPending}/>

                <SelectField
                    labelText="Combustível"
                    name="fuel"
                    defaultValue={formState.fuel}
                    disabled={isPending}
                    options={[
                        { label: 'Gasolina', value: 'gasolina' },
                        { label: 'Etanol', value: 'etanol' },
                        { label: 'Flex', value: 'flex' },
                        { label: 'Diesel', value: 'diesel' },
                        { label: 'Elétrico', value: 'eletrico' },
                        { label: 'Híbrido', value: 'hibrido' },
                    ]}
                />

                <InputText
                    labelText="Preço"
                    placeholder="Digite o preço do veículo"
                    name="price"
                    type="text"
                    inputMode="numeric"
                    disabled={isPending}
                    defaultValue={formState.price}
                    maxLength={9}
                    onChange={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                    }}
                />

                <InputText
                    labelText="Quilometragem"
                    placeholder="Digite a quilometragem do veículo"
                    name="mileage"
                    type="text"
                    inputMode="numeric"
                    defaultValue={formState.mileage}
                    disabled={isPending}
                    maxLength={9}
                    onChange={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                    }}
                />

                <InputText labelText="Cor" name='color' placeholder="Digite a cor do veículo" type="text" defaultValue={formState.color} disabled={isPending}/>

                <MarkdownEditor labelText="Descrição" value={contentValue} setValue={setContentValue} textAreaName="description" disabled={isPending}/>

                <ImageUploader disabled={isPending}  initialImages={formState.images || []}/>

                {mode === 'update' && (
                    <InputCheckbox  labelText="Ativo?" name='active'  type="checkbox" defaultChecked={formState.active || false} disabled={isPending}/>
                )}

                <div className="mt-4">
                    <Button type="submit" size="md" className="w-full" disabled={isPending}>Enviar</Button>
                </div>
            </div>
        </form>
    )
}

