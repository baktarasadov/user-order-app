import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class BaseUserRequest {
    @ApiProperty({
        description: 'UserName is unique',
        example: 'Baktar',
    })
    @IsString({ message: 'userName must be a string' })
    @IsNotEmpty({ message: 'userName cannot be empty' })
    userName: string;

    @ApiProperty({
        description: 'Password must be strong (min 8 characters, upper, lower, number, special)',
        example: 'P@ssw0rd!',
    })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        {
            message:
                'Password must contain uppercase, lowercase, number, and special character',
        },
    )
    password: string;

}
