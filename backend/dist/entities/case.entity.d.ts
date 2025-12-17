import { User } from './user.entity';
import { Client } from './client.entity';
import { Document } from './document.entity';
import { FinancialRecord } from './financial-record.entity';
export declare enum CaseStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    CLOSED = "closed",
    DROPPED = "dropped"
}
export declare enum CaseType {
    CIVIL = "civil",
    CRIMINAL = "criminal",
    FAMILY = "family",
    CORPORATE = "corporate",
    PROPERTY = "property",
    OTHER = "other"
}
export declare class Case {
    id: string;
    caseNumber: string;
    title: string;
    type: CaseType;
    status: CaseStatus;
    description: string;
    startDate: Date;
    endDate: Date;
    estimatedCost: number;
    lawyer: User;
    client: Client;
    documents: Document[];
    financialRecords: FinancialRecord[];
    createdAt: Date;
    updatedAt: Date;
}
