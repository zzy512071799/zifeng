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
exports.Schedule = exports.ScheduleStatus = exports.ScheduleType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var ScheduleType;
(function (ScheduleType) {
    ScheduleType["MEETING"] = "meeting";
    ScheduleType["COURT_DATE"] = "court_date";
    ScheduleType["TASK"] = "task";
    ScheduleType["DEADLINE"] = "deadline";
    ScheduleType["OTHER"] = "other";
})(ScheduleType || (exports.ScheduleType = ScheduleType = {}));
var ScheduleStatus;
(function (ScheduleStatus) {
    ScheduleStatus["PENDING"] = "pending";
    ScheduleStatus["COMPLETED"] = "completed";
    ScheduleStatus["CANCELLED"] = "cancelled";
    ScheduleStatus["IN_PROGRESS"] = "in_progress";
})(ScheduleStatus || (exports.ScheduleStatus = ScheduleStatus = {}));
let Schedule = class Schedule {
    id;
    title;
    type;
    startTime;
    endTime;
    description;
    location;
    status;
    isAllDay;
    user;
    createdAt;
    updatedAt;
};
exports.Schedule = Schedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Schedule.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ScheduleType }),
    __metadata("design:type", String)
], Schedule.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Schedule.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Schedule.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Schedule.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Schedule.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ScheduleStatus }),
    __metadata("design:type", String)
], Schedule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Schedule.prototype, "isAllDay", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.schedules),
    __metadata("design:type", user_entity_1.User)
], Schedule.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Schedule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Schedule.prototype, "updatedAt", void 0);
exports.Schedule = Schedule = __decorate([
    (0, typeorm_1.Entity)('schedules')
], Schedule);
//# sourceMappingURL=schedule.entity.js.map