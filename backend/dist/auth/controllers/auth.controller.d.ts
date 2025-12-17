import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: {
        username: string;
        password: string;
    }): Promise<{
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
    register(registerDto: {
        username: string;
        password: string;
        email: string;
        phone: string;
        name: string;
        position: string;
        roleId: string;
    }): Promise<import("../../entities/user.entity").User[]>;
    getProfile(req: any): Promise<any>;
}
