import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { UserModule } from "../user";
import { AuthService } from "./services/auth.service";
import { AuthHelperService } from "./services/auth-helper.service";
import { EntityMapper } from "src/common/mapper";
import { JwtService } from "@nestjs/jwt";

const imports = [
    UserModule,
];

const controllers = [AuthController];

const providers = [
    AuthService,
    AuthHelperService,
    EntityMapper,
    JwtService
];

@Module({
    controllers,
    imports,
    providers,
})
export class AuthModule { }