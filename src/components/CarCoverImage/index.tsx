import Link from "next/link";
import Image from "next/image";

type CarCoverImageprops = {
    imageProps: React.ComponentProps<typeof Image>
    linkProps: React.ComponentProps<typeof Link>
}

export default function CarCoverImage({ linkProps, imageProps }: CarCoverImageprops){
    return (
        <Link className="overflow-hidden rounded-xl block relative aspect-video" {...linkProps}>
            <Image 
            {...imageProps}
            className="group-hover:scale-105 transition-transform duration-300 object-cover w-full h-full" 
            />
        </Link>
    )
}