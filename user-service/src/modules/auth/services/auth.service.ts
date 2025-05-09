import {
    BadRequestException,
    Injectable,
} from "@nestjs/common";
import { UserService } from "src/modules/user";
import { AuthRegister } from "../requests/auth-register.request";
import { AuthLogin } from "../requests/auth-login.request";
import { AuthHelperService } from './auth-helper.service'
import * as bcrypt from "bcrypt";
import { EntityMapper } from "src/common/mapper";
import { AuthDto } from "../dtos/auth.dto";
import { AuthTokenVerify } from "../requests/auth-token-verify.request";
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly authHelperService: AuthHelperService,
        private readonly entityMapper: EntityMapper,
    ) { }

    async register(authRegister: AuthRegister) {
        await this.userService.isUniqueByUserNameAndThrow(authRegister.userName);
        const password = await this.authHelperService.generatePasswordHash(authRegister.password);

        return this.userService.create({
            userName: authRegister.userName,
            password,
        });
    }

    async login(authLogin: AuthLogin) {
        const user = await this.userService.findByUserName(authLogin.userName);

        const invalidUserNameOrPasswordException = new BadRequestException(
            "UserName or Passowrd incorrect",
        );

        if (!user) {
            throw invalidUserNameOrPasswordException;
        }

        const isPasswordMatch = await bcrypt.compare(
            authLogin.password,
            user.password,
        );

        if (!isPasswordMatch) {
            throw invalidUserNameOrPasswordException;
        }

        const token = await this.authHelperService.generateToken(user);

        const entity = {
            token,
            user
        }

        return this.entityMapper.toDto(entity, AuthDto)
    }


    async verifyToken(authTokenVerify: AuthTokenVerify) {
        return this.authHelperService.verifyToken(authTokenVerify);
    }

}