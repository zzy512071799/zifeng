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
exports.FinancialRecord = exports.PaymentMethod = exports.FinancialType = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("./case.entity");
var FinancialType;
(function (FinancialType) {
    FinancialType["INCOME"] = "income";
    FinancialType["EXPENSE"] = "expense";
})(FinancialType || (exports.FinancialType = FinancialType = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "cash";
    PaymentMethod["BANK_TRANSFER"] = "bank_transfer";
    PaymentMethod["ALIPAY"] = "alipay";
    PaymentMethod["WECHAT_PAY"] = "wechat_pay";
    PaymentMethod["CREDIT_CARD"] = "credit_card";
    PaymentMethod["OTHER"] = "other";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
let FinancialRecord = class FinancialRecord {
    id;
    type;
    amount;
    description;
    paymentMethod;
    transactionDate;
    receiptNumber;
    case;
    createdAt;
    updatedAt;
};
exports.FinancialRecord = FinancialRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FinancialRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: FinancialType }),
    __metadata("design:type", String)
], FinancialRecord.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], FinancialRecord.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], FinancialRecord.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PaymentMethod }),
    __metadata("design:type", String)
], FinancialRecord.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], FinancialRecord.prototype, "transactionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], FinancialRecord.prototype, "receiptNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (caseItem) => caseItem.financialRecords),
    __metadata("design:type", case_entity_1.Case)
], FinancialRecord.prototype, "case", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FinancialRecord.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FinancialRecord.prototype, "updatedAt", void 0);
exports.FinancialRecord = FinancialRecord = __decorate([
    (0, typeorm_1.Entity)('financial_records')
], FinancialRecord);
//# sourceMappingURL=financial-record.entity.js.map