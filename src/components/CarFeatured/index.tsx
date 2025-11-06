import CarCoverImage from "../CarCoverImage";
import CarHeading from "../CarHeading";

export function CarFeatured(){
    const id = '1'
    const carLink =  `/car/${id}`

    return (
        <section className="
                grid grid-cols-1 gap-8 mb-16
                sm:grid-cols-2
                group">
            <CarCoverImage 
            linkProps={
                {
                    href: carLink
                }
            } 
            imageProps={
                    {
                        width: 1200,
                        height: 720,
                        src: "/images/focus.png",
                        alt: 'Alt da Imagem',
                        priority: true
                    }
                } />
            <div className="flex flex-col gap-4 sm:justify-center">
                <time className="text-slate-600 text-sm/tight" dateTime="2025-11-20">04/11/2025 10:00</time>
                <CarHeading url={carLink} as='h1'>Ford Focus</CarHeading>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quis ipsum dolores ad ipsa maiores aut atque itaque earum. Numquam culpa saepe minus, reiciendis quaerat ea nemo commodi inventore vel!
                </p>
            </div>
        </section>
    )
}