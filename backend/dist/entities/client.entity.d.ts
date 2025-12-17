import { Case } from './case.entity';
export declare class Client {
    id: string;
    name: string;
    gender: string;
    birthDate: Date;
    phone: string;
    email: string;
    address: string;
    idNumber: string;
    cases: Case[];
    createdAt: Date;
    updatedAt: Date;
}
