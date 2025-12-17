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
exports.Document = exports.DocumentType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const case_entity_1 = require("./case.entity");
var DocumentType;
(function (DocumentType) {
    DocumentType["CONTRACT"] = "contract";
    DocumentType["EVIDENCE"] = "evidence";
    DocumentType["COURT_DOCUMENT"] = "court_document";
    DocumentType["CORRESPONDENCE"] = "correspondence";
    DocumentType["OTHER"] = "other";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
let Document = class Document {
    id;
    title;
    type;
    fileName;
    filePath;
    fileSize;
    fileType;
    description;
    uploader;
    case;
    isShared;
    createdAt;
    updatedAt;
};
exports.Document = Document;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Document.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DocumentType }),
    __metadata("design:type", String)
], Document.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Document.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Document.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Document.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Document.prototype, "fileType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.documents),
    __metadata("design:type", user_entity_1.User)
], Document.prototype, "uploader", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (caseItem) => caseItem.documents),
    __metadata("design:type", case_entity_1.Case)
], Document.prototype, "case", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Document.prototype, "isShared", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Document.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Document.prototype, "updatedAt", void 0);
exports.Document = Document = __decorate([
    (0, typeorm_1.Entity)('documents')
], Document);
//# sourceMappingURL=document.entity.js.map