export type CountryVatRate = {
    country: string;
    countryCode: string;
    id: number;
    vatRate: number;
};
export type CountryVatRateData = Pick<CountryVatRate, 'countryCode' | 'vatRate'>;
