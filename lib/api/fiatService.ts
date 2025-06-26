export interface FiatTransactionParams {
    amount: number;
    currency: string;
    paymentMethod: string;
}

export interface FiatTransactionResponse {
    transactionId: string;
    status: 'pending' | 'completed' | 'failed';
    message: string;
}

export async function depositFiat(params: FiatTransactionParams): Promise<FiatTransactionResponse> {
    console.log('Initiating fiat deposit:', params);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate potential errors
    if (params.amount > 10000) {
        return {
            transactionId: '',
            status: 'failed',
            message: 'Deposit amount exceeds the limit of $10,000.',
        };
    }

    return {
        transactionId: `txn_${new Date().getTime()}`,
        status: 'pending',
        message: 'Your deposit is being processed. Funds should be available shortly.',
    };
}

export async function withdrawFiat(params: FiatTransactionParams): Promise<FiatTransactionResponse> {
    console.log('Initiating fiat withdrawal:', params);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate potential errors
    if (params.amount <= 0) {
        return {
            transactionId: '',
            status: 'failed',
            message: 'Withdrawal amount must be greater than zero.',
        };
    }

    return {
        transactionId: `txn_${new Date().getTime()}`,
        status: 'pending',
        message: 'Your withdrawal has been initiated and is being processed.',
    };
} 