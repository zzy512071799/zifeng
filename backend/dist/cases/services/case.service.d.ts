import { Repository } from 'typeorm';
import { Case } from '../../entities/case.entity';
export declare class CaseService {
    private readonly caseRepository;
    constructor(caseRepository: Repository<Case>);
    create(createCaseDto: {
        caseNumber: string;
        title: string;
        type: any;
        status: any;
        description: string;
        startDate: Date;
        endDate?: Date;
        estimatedCost?: number;
        lawyerId: string;
        clientId: string;
    }): Promise<Case>;
    findAll(query: {
        page?: number;
        limit?: number;
        lawyerId?: string;
        clientId?: string;
        status?: string;
        type?: string;
    }): Promise<{
        data: Case[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Case | null>;
    update(id: string, updateCaseDto: Partial<Case>): Promise<Case | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
