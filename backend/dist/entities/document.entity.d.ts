import { User } from './user.entity';
import { Case } from './case.entity';
export declare enum DocumentType {
    CONTRACT = "contract",
    EVIDENCE = "evidence",
    COURT_DOCUMENT = "court_document",
    CORRESPONDENCE = "correspondence",
    OTHER = "other"
}
export declare class Document {
    id: string;
    title: string;
    type: DocumentType;
    fileName: string;
    filePath: string;
    fileSize: string;
    fileType: string;
    description: string;
    uploader: User;
    case: Case;
    isShared: boolean;
    createdAt: Date;
    updatedAt: Date;
}
