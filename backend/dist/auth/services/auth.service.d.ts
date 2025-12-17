import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            name: any;
            email: any;
            phone: any;
            position: any;
            role: any;
        };
    }>;
    register(userData: any): Promise<User[]>;
    getCurrentUser(userId: string): Promise<User | null>;
}
