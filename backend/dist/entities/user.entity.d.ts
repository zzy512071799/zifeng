import { Role } from './role.entity';
import { Case } from './case.entity';
import { Document } from './document.entity';
import { Schedule } from './schedule.entity';
export declare class User {
    id: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    name: string;
    position: string;
    role: Role;
    cases: Case[];
    documents: Document[];
    schedules: Schedule[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
