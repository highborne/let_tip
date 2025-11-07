import { CurrencyType } from '@/lib/currency';

interface ExchangeRateData {
    bid: string;
    code: string;
    timestamp: string;
}

interface CurrencyApiResponse {
    [key: string]: ExchangeRateData;
}

export async function getExchangeRateToBRL(currency: CurrencyType): Promise<number> {
    if (currency === 'BRL') {
        return 1.0;
    }

    try {
        const apiUrl = `https://economia.awesomeapi.com.br/json/last/${currency}-BRL`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API Error: HTTP status ${response.status}`);
        }
        
        const data: CurrencyApiResponse = await response.json();
        const { bid } = data[`${currency}BRL`];
        
        if (data && bid) {
            return Number(parseFloat(bid).toFixed(2));
        } else {
            throw new Error(`Dados de câmbio inválidos`);
        }
    } catch (error) {
        throw error; 
    }
}