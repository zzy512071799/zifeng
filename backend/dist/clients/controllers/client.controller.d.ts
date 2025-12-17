import { ClientService } from '../services/client.service';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: any): Promise<import("../../entities/client.entity").Client>;
    findAll(query: any): Promise<{
        data: import("../../entities/client.entity").Client[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("../../entities/client.entity").Client | null>;
    update(id: string, updateClientDto: any): Promise<import("../../entities/client.entity").Client | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
