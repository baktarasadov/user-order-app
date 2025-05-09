import { EntityMapper } from 'src/common/mapper';
import { UserRepository } from '../repositories/user.repository';
import {
    Injectable,
} from "@nestjs/common";
import { UserDto } from '../dtos/user.dto';
import { UserCreate } from '../requests/user-create.request';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly entityMapper: EntityMapper,
    ) {
    }

    async isUniqueByUserNameAndThrow(userName: string): Promise<UserDto> {
        const user = await this.userRepository.isUniqueAndThrow({ where: { userName } });
        return this.entityMapper.toDto(user, UserDto);;
    }

    async create(userCreate: UserCreate): Promise<UserDto> {
        return this.userRepository.save(userCreate as UserEntity)
    }

    async findByUserName(userName: string) {
        return this.userRepository.findOne({ where: { userName } })
    }
}