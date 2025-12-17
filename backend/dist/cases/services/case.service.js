"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const case_entity_1 = require("../../entities/case.entity");
let CaseService = class CaseService {
    caseRepository;
    constructor(caseRepository) {
        this.caseRepository = caseRepository;
    }
    async create(createCaseDto) {
        const newCase = this.caseRepository.create(createCaseDto);
        return this.caseRepository.save(newCase);
    }
    async findAll(query) {
        const { page = 1, limit = 10, lawyerId, clientId, status, type } = query;
        const skip = (page - 1) * limit;
        const queryBuilder = this.caseRepository.createQueryBuilder('case')
            .leftJoinAndSelect('case.lawyer', 'lawyer')
            .leftJoinAndSelect('case.client', 'client')
            .skip(skip)
            .take(limit);
        if (lawyerId) {
            queryBuilder.andWhere('case.lawyerId = :lawyerId', { lawyerId });
        }
        if (clientId) {
            queryBuilder.andWhere('case.clientId = :clientId', { clientId });
        }
        if (status) {
            queryBuilder.andWhere('case.status = :status', { status });
        }
        if (type) {
            queryBuilder.andWhere('case.type = :type', { type });
        }
        const [cases, total] = await queryBuilder.getManyAndCount();
        return {
            data: cases,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        return this.caseRepository.findOne({
            where: { id },
            relations: ['lawyer', 'client', 'documents', 'financialRecords'],
        });
    }
    async update(id, updateCaseDto) {
        await this.caseRepository.update(id, updateCaseDto);
        return this.findOne(id);
    }
    async remove(id) {
        return this.caseRepository.delete(id);
    }
};
exports.CaseService = CaseService;
exports.CaseService = CaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(case_entity_1.Case)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CaseService);
//# sourceMappingURL=case.service.js.map