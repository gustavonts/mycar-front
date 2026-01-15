export async function asyncDelay(miliseconds :number = 0, verbose = false) {
    if(miliseconds <0 ) return

    if(verbose) {
        console.log(`Delay de ${miliseconds} miliseconds`)
    }

    await new Promise(resolve => setTimeout(resolve, miliseconds))
}