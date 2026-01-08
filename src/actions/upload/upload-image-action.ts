'use server'

import { getLoginSessionForApi } from "@/lib/login/manage-login"
import { authenticatedApiRequest } from "@/utils/authenticated-api-request"

type uploadImageActionResult = {
    url: string
    error: string
}

export async function uploadImageAction(formData: FormData): Promise<uploadImageActionResult> {

    const uploadMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600
    const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads' 

    const makeResult = ({url = '', error = ''}) => {
        return {url, error}
    }

    const isAuthenticated = await getLoginSessionForApi()

    if (!isAuthenticated) {
        return makeResult({ error: 'Não autenticado.'})
    }

    if (!(formData instanceof FormData)){
        return makeResult({error: 'Dados inválidos'})
    }

    const file = formData.get('file')

    if(!(file instanceof File)) {
        return makeResult({error: 'Arquivo inválido'})
    }

    if(file.size > uploadMaxSize) {
        return makeResult({error: 'Arquivo muito grande'})
    }

    if(!file.type.startsWith('image/')) {
        return makeResult({error: 'Imagem inválida'})
    }

    const uploadResponse = await authenticatedApiRequest<{url: string}>(
        `${process.env.API_URL}/upload`,
        {
            method: 'POST',
            body: formData
        }
    )

    if(!uploadResponse.success) {
        return makeResult({ error: uploadResponse.errors[0] })
    }

    const imgServerUrl = process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads'
    const url = `${process.env.IMAGE_SERVER_URL}${uploadResponse.data.url}`

    return makeResult({url})
}