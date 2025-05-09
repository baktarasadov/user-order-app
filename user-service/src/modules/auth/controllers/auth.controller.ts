import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from "@nestjs/common";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
} from "@nestjs/swagger";

import { API_VERSION } from "src/common/constants";
import { AuthService } from "../services/auth.service";
import { AuthLogin } from "../requests/auth-login.request";
import { AuthRegister } from "../requests/auth-register.request";
import { ResponseEntity } from "src/common/mapper/response-entity.mapper";
import { AuthDto } from "../dtos/auth.dto";
import { MessagePattern } from "@nestjs/microservices";
import { AuthTokenVerify } from "../requests/auth-token-verify.request";

@ApiTags("Auth")
@Controller({
    path: "auth",
    version: API_VERSION,
})
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Login user" })
    @ApiBody({ type: AuthLogin })
    @ApiResponse({
        status: 200,
        description: "User successfully logged in",
        type: AuthDto,
    })

    async login(@Body() login: AuthLogin) {
        const data = await this.authService.login(login);

        return ResponseEntity.ok<AuthDto>()
            .setBody(data)
            .setMessage("User successfully logged in");
    }

    @Post("register")
    @ApiOperation({ summary: "Register user" })
    @ApiBody({ type: AuthRegister })
    @ApiResponse({
        status: 200,
        description: "User successfully registered",
    })
    async register(@Body() register: AuthRegister) {
        await this.authService.register(register);

        return ResponseEntity.ok().setMessage("User successfully registered");
    }

    @MessagePattern({ cmd: 'verify_token' })
    async verifyToken(authTokenVerify: AuthTokenVerify) {
        const data = await this.authService.verifyToken(authTokenVerify);

        return ResponseEntity.ok().setBody(data);
    }
}
