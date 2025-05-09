import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserClientService } from './user-client.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly userClient: UserClientService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;

        if (!authHeader) throw new UnauthorizedException('No token');

        const token = authHeader.replace('Bearer ', '');

        try {
            const user = await this.userClient.verifyToken(token);

            req['user'] = user;
            return true;
        } catch (error) {
            console.error(error)
            throw new UnauthorizedException('Invalid token');
        }
    }
}
