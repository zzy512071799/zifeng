import { Case } from './case.entity';
export declare enum FinancialType {
    INCOME = "income",
    EXPENSE = "expense"
}
export declare enum PaymentMethod {
    CASH = "cash",
    BANK_TRANSFER = "bank_transfer",
    ALIPAY = "alipay",
    WECHAT_PAY = "wechat_pay",
    CREDIT_CARD = "credit_card",
    OTHER = "other"
}
export declare class FinancialRecord {
    id: string;
    type: FinancialType;
    amount: number;
    description: string;
    paymentMethod: PaymentMethod;
    transactionDate: Date;
    receiptNumber: string;
    case: Case;
    createdAt: Date;
    updatedAt: Date;
}
