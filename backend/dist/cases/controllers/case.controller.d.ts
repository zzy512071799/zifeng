import { CaseService } from '../services/case.service';
export declare class CaseController {
    private readonly caseService;
    constructor(caseService: CaseService);
    create(createCaseDto: any): Promise<import("../../entities/case.entity").Case>;
    findAll(query: any): Promise<{
        data: import("../../entities/case.entity").Case[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("../../entities/case.entity").Case | null>;
    update(id: string, updateCaseDto: any): Promise<import("../../entities/case.entity").Case | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
