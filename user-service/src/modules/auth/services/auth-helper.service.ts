import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { ACCESS_TOKEN_EXPIRATION } from "../constants/auth.constant";
import { AuthTokenVerify } from "../requests/auth-token-verify.request";
@Injectable()
export class AuthHelperService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async generatePasswordHash(
        password: string,
    ): Promise<string> {
        try {
            const passwordSalt = await bcrypt.genSalt();
            return await bcrypt.hash(password, passwordSalt);
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    };

    async generateToken(user: UserEntity) {
        const jwtPayload = {
            sub: user.id,
            userName: user.userName,
        };

        const accessToken = this.jwtService.sign(jwtPayload, {
            expiresIn: ACCESS_TOKEN_EXPIRATION.AS_STRING,
            algorithm: 'HS256',
            secret: process.env.JWT_SECRET_KEY
        });

        return accessToken
    }

    async verifyToken(authTokenVerify: AuthTokenVerify) {

        try {
            const decoded = await this.jwtService.verifyAsync(authTokenVerify.token, {
                secret: process.env.JWT_SECRET_KEY,
            });

            if (!decoded) {
                throw new UnauthorizedException('Token is invalid.');
            }

            return decoded;
        } catch (error) {
            throw new UnauthorizedException('Token verification failed.');
        }
    }
}

