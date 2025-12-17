import { Repository } from 'typeorm';
import { Client } from '../../entities/client.entity';
export declare class ClientService {
    private readonly clientRepository;
    constructor(clientRepository: Repository<Client>);
    create(createClientDto: {
        name: string;
        gender: string;
        birthDate: Date;
        phone: string;
        email: string;
        address: string;
        idNumber: string;
    }): Promise<Client>;
    findAll(query: {
        page?: number;
        limit?: number;
        name?: string;
        phone?: string;
        email?: string;
    }): Promise<{
        data: Client[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Client | null>;
    update(id: string, updateClientDto: Partial<Client>): Promise<Client | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
