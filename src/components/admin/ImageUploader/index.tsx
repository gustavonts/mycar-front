'use client'

import { uploadImageAction } from "@/actions/upload/upload-image-action"
import { Button } from "@/components/Button"
import { ImageUpIcon } from "lucide-react"
import { useRef, useState, useTransition } from "react"
import { toast } from "react-toastify"

type ImageUploaderProps = {
    disabled?: boolean
}

export function ImageUploader({ disabled }: ImageUploaderProps) {

    const uploadMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600

    const fileInputRef = useRef<HTMLInputElement>(null)

    const [isUploading, startTransition] = useTransition()

    const [imgUrl, setImgUrl] = useState('')

    function handleChooseFile() {
        if(!fileInputRef.current) return
        fileInputRef.current.click()
    }

    function handleChange() {
        toast.dismiss()
        
        if(!fileInputRef.current) return

        const fileInput = fileInputRef.current
        const file = fileInput?.files?.[0]

        if(!file) {
            setImgUrl('')
            return
        }

        if (file.size > uploadMaxSize) {
            const readableMaxSize = (uploadMaxSize / 1024).toFixed(2)
            toast.error(`Imagem muito grande. Max.: ${readableMaxSize}KB`)
            fileInput.value = ''
            setImgUrl('')
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        startTransition(async () => {
            const result = await uploadImageAction(formData)

            if (result.error) {
                toast.error(result.error)
                fileInput.value = ''
                setImgUrl('')
                return
            }

            setImgUrl(result.url)
            toast.success('Imagem enviada')
        })

        fileInput.value = ''
    }

    return (
        <div className="flex flex-col gap-4 py-4">
            <Button type="button" className="self-start" onClick={handleChooseFile} disabled={isUploading || disabled}>
                <ImageUpIcon />
                Enviar uma imagem
            </Button>

            {!!imgUrl && (
                <div className='flex flex-col gap-4'>
                    <input type="hidden" name="images" value={imgUrl} />

                    <p><b>URL: </b> {imgUrl}</p>
                    <img className='rounded-lg' src={imgUrl} />
                </div>
            )}

            <input 
                ref={fileInputRef} 
                className="hidden" 
                type="file" 
                accept="image/*" 
                onChange={handleChange} 
                disabled={isUploading || disabled}
            />
        </div>
    )
}
