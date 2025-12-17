import { Role } from './role.entity';
export declare class Permission {
    id: string;
    name: string;
    description: string;
    module: string;
    roles: Role[];
}
