/**
 * Format a price value as Indonesian Rupiah.
 * Returns 'Gratis' if price is zero or not provided.
 */
export function formatPriceIDR(prices?: { finalPrice?: number; basePrice?: number } | null): string {
    if (!prices) return 'Gratis'

    if (prices.finalPrice === 0 || prices.basePrice === 0) return 'Gratis'

    const price = prices.finalPrice ?? prices.basePrice
    if (!price) return 'Gratis'

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price)
}
