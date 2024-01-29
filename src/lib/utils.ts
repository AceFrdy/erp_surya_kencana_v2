// dashboard
export interface DashboardCard {
    total_sales: number;
    revenue: number;
    total_customers: number;
    total_employers: number;
}

export interface RecentOrderProps {
    id: number;
    sale_report_customer: string;
    sale_report_invoice: string;
    sale_report_grand_total: number;
    sale_report_status: string;
}

export interface CashFlowProps {
    amount: number;
    date: string;
    index: {
        index_info: string;
    };
}
export interface TopSellingProps {
    branch_name: string;
    product_name: string;
    product_price: number;
    total_sold: number;
}

export const iconClassFlow: Record<number, string> = {
    1: 'bg-success-light dark:bg-success text-success dark:text-success-light',
    2: 'bg-warning-light dark:bg-warning text-warning dark:text-warning-light',
    3: 'bg-danger-light dark:bg-danger text-danger dark:text-danger-light',
    4: 'bg-info-light dark:bg-info text-info dark:text-info-light',
    5: 'bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light',
    6: 'bg-primary-light dark:bg-primary text-primary dark:text-primary-light',
};
