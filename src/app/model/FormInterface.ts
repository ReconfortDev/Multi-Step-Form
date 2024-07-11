export interface PLAN {
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
    icon: string;
    active: boolean;
}

export interface ADDON {
    name: string;
    description: string;
    price: number;
    selected: boolean;
}

export type BILLING_PERIOD = 'monthly' | 'yearly';
