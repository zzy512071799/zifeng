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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = exports.CaseType = exports.CaseStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const client_entity_1 = require("./client.entity");
const document_entity_1 = require("./document.entity");
const financial_record_entity_1 = require("./financial-record.entity");
var CaseStatus;
(function (CaseStatus) {
    CaseStatus["PENDING"] = "pending";
    CaseStatus["IN_PROGRESS"] = "in_progress";
    CaseStatus["CLOSED"] = "closed";
    CaseStatus["DROPPED"] = "dropped";
})(CaseStatus || (exports.CaseStatus = CaseStatus = {}));
var CaseType;
(function (CaseType) {
    CaseType["CIVIL"] = "civil";
    CaseType["CRIMINAL"] = "criminal";
    CaseType["FAMILY"] = "family";
    CaseType["CORPORATE"] = "corporate";
    CaseType["PROPERTY"] = "property";
    CaseType["OTHER"] = "other";
})(CaseType || (exports.CaseType = CaseType = {}));
let Case = class Case {
    id;
    caseNumber;
    title;
    type;
    status;
    description;
    startDate;
    endDate;
    estimatedCost;
    lawyer;
    client;
    documents;
    financialRecords;
    createdAt;
    updatedAt;
};
exports.Case = Case;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Case.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Case.prototype, "caseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Case.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CaseType }),
    __metadata("design:type", String)
], Case.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CaseStatus }),
    __metadata("design:type", String)
], Case.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Case.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Case.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Case.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Case.prototype, "estimatedCost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.cases),
    __metadata("design:type", user_entity_1.User)
], Case.prototype, "lawyer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.cases),
    __metadata("design:type", client_entity_1.Client)
], Case.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (document) => document.case),
    __metadata("design:type", Array)
], Case.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => financial_record_entity_1.FinancialRecord, (record) => record.case),
    __metadata("design:type", Array)
], Case.prototype, "financialRecords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Case.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Case.prototype, "updatedAt", void 0);
exports.Case = Case = __decorate([
    (0, typeorm_1.Entity)('cases')
], Case);
//# sourceMappingURL=case.entity.js.map