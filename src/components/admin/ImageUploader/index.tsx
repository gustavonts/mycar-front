'use client'

import { uploadImageAction } from "@/actions/upload/upload-image-action"
import { Button } from "@/components/Button"
import { ImageUpIcon, Trash2Icon } from "lucide-react"
import { useRef, useState, useTransition } from "react"
import { toast } from "react-toastify"

type ImageUploaderProps = {
    disabled?: boolean
    initialImages?: string[]
}

export function ImageUploader({ disabled, initialImages = [] }: ImageUploaderProps) {

    const uploadMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, startTransition] = useTransition()

    const [images, setImages] = useState<string[]>(initialImages)

    function handleChooseFile() {
        fileInputRef.current?.click()
    }

    function handleChange() {
        toast.dismiss()

        const file = fileInputRef.current?.files?.[0]
        if (!file) return

        if (file.size > uploadMaxSize) {
            toast.error(`Imagem muito grande. Máx: ${(uploadMaxSize / 1024).toFixed(2)}KB`)
            fileInputRef.current!.value = ''
            return
        }

        if (!file.type.startsWith('image/')) {
            toast.error('Arquivo inválido')
            fileInputRef.current!.value = ''
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        startTransition(async () => {
            const result = await uploadImageAction(formData)

            if (result.error) {
                toast.error(result.error)
                return
            }

            setImages(prev => [...prev, result.url])
            toast.success('Imagem enviada')
        })

        fileInputRef.current!.value = ''
    }

    function removeImage(url: string) {
        setImages(prev => prev.filter(img => img !== url))
    }

    return (
        <div className="flex flex-col gap-4 py-4">
            <Button
                type="button"
                onClick={handleChooseFile}
                disabled={isUploading || disabled}
                className="self-start"
            >
                <ImageUpIcon />
                Enviar imagem
            </Button>

            {images.map((url, i) => (
                <input key={i} type="hidden" name="images" value={url} />
            ))}

            <div className="grid grid-cols-2 gap-4">
                {images.map(url => (
                    <div key={url} className="relative">
                        <img src={url} className="rounded-lg" />
                        <button
                            type="button"
                            onClick={() => removeImage(url)}
                            className="absolute top-2 right-2 bg-black/60 p-1 rounded"
                        >
                            <Trash2Icon size={16} color="white" />
                        </button>
                    </div>
                ))}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
                disabled={isUploading || disabled}
            />
        </div>
    )
}
