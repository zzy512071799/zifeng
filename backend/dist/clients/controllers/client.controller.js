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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const permissions_decorator_1 = require("../../auth/decorators/permissions.decorator");
const client_service_1 = require("../services/client.service");
let ClientController = class ClientController {
    clientService;
    constructor(clientService) {
        this.clientService = clientService;
    }
    async create(createClientDto) {
        return this.clientService.create(createClientDto);
    }
    async findAll(query) {
        return this.clientService.findAll(query);
    }
    async findOne(id) {
        return this.clientService.findOne(id);
    }
    async update(id, updateClientDto) {
        return this.clientService.update(id, updateClientDto);
    }
    async remove(id) {
        return this.clientService.remove(id);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, permissions_decorator_1.Permissions)('client:create'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "create", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('client:read'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findAll", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('client:read'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findOne", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('client:update'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "update", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('client:delete'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "remove", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
//# sourceMappingURL=client.controller.js.map