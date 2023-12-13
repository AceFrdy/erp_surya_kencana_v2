const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
});

export function formatPrice(price: number): string {
    return formatter.format(price);
}
