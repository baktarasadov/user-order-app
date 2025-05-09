import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthTokenVerify {
    @ApiProperty({
        description: 'Verification token sent to the user. Must be a valid string token.',
        example: 'a9f4c2e7b8d3e6!@#',
        minLength: 6,
        maxLength: 256,
    })
    @IsString({ message: 'Token must be a string.' })
    @IsNotEmpty({ message: 'Token cannot be empty.' })

    token: string;

}
