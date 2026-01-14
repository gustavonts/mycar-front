export function formatMoney(value: number | string) {
    if (value === null || value === undefined || value === '') return 'R$ 0,00'

    const numberValue = typeof value === 'string' ? parseFloat(value) : value

    if (isNaN(numberValue)) return 'R$ 0,00'

    return numberValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}
