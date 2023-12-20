const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
});

export function formatPrice(price: number): string {
    return formatter.format(price);
}

export interface MetaLinkProps {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
}
export interface MetaLinksLinkProps {
    active: boolean;
    label: string;
    url: string;
}

export interface LinksLinkProps {
    first: string;
    last: string;
    next: string;
    prev: string;
}
