import { User } from './user.entity';
export declare enum ScheduleType {
    MEETING = "meeting",
    COURT_DATE = "court_date",
    TASK = "task",
    DEADLINE = "deadline",
    OTHER = "other"
}
export declare enum ScheduleStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    IN_PROGRESS = "in_progress"
}
export declare class Schedule {
    id: string;
    title: string;
    type: ScheduleType;
    startTime: Date;
    endTime: Date;
    description: string;
    location: string;
    status: ScheduleStatus;
    isAllDay: boolean;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
