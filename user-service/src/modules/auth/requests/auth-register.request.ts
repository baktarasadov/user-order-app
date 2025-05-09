import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Match } from 'src/core/validations';
import { BaseUserRequest, UserCreate } from 'src/modules/user';

export class AuthRegister extends BaseUserRequest {

    @ApiProperty({
        description: 'Repeat password must match the password',
        example: 'P@ssw0rd!',
    })
    @IsString({ message: 'Repeat password must be a string' })
    @IsNotEmpty({ message: 'Repeat password cannot be empty' })
    @Match('password', { message: 'Passwords do not match' })
    repeatPassword: string;
}
