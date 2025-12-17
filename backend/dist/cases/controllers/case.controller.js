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
exports.CaseController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const permissions_decorator_1 = require("../../auth/decorators/permissions.decorator");
const case_service_1 = require("../services/case.service");
let CaseController = class CaseController {
    caseService;
    constructor(caseService) {
        this.caseService = caseService;
    }
    async create(createCaseDto) {
        return this.caseService.create(createCaseDto);
    }
    async findAll(query) {
        return this.caseService.findAll(query);
    }
    async findOne(id) {
        return this.caseService.findOne(id);
    }
    async update(id, updateCaseDto) {
        return this.caseService.update(id, updateCaseDto);
    }
    async remove(id) {
        return this.caseService.remove(id);
    }
};
exports.CaseController = CaseController;
__decorate([
    (0, permissions_decorator_1.Permissions)('case:create'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "create", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('case:read'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "findAll", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('case:read'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "findOne", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('case:update'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "update", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('case:delete'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CaseController.prototype, "remove", null);
exports.CaseController = CaseController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('cases'),
    __metadata("design:paramtypes", [case_service_1.CaseService])
], CaseController);
//# sourceMappingURL=case.controller.js.map