import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./services/user.service";
import { UserRepository } from "./repositories/user.repository";
import { EntityMapper } from "src/common/mapper";

const imports = [
    TypeOrmModule.forFeature([UserEntity]),
]

const providers = [UserService, UserRepository, EntityMapper];

const exportss = [UserService]

@Module({
    imports,
    providers,
    exports: exportss,
})
export class UserModule { }