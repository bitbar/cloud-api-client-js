export declare type CountryVatRate = {
    country: string;
    countryCode: string;
    id: number;
    vatRate: number;
};
export declare type CountryVatRateData = Pick<CountryVatRate, 'countryCode' | 'vatRate'>;
