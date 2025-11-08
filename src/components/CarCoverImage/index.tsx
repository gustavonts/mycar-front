import Link from "next/link";
import Image from "next/image";

type CarCoverImageprops = {
    imageProps: React.ComponentProps<typeof Image>
    linkProps: React.ComponentProps<typeof Link>
}

export default function CarCoverImage({ linkProps, imageProps }: CarCoverImageprops){
    return (
        <Link className="overflow-hidden rounded-xl" {...linkProps}>
            <Image 
            {...imageProps}
            className="group-hover:scale-105 transition object-cover object-center" 
            />
        </Link>
    )
}