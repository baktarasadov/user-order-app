import { Exclude, Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "src/modules/base";
import { UserDto } from "src/modules/user";

export class AuthDto extends BaseDto {
    @Expose()
    @ApiProperty({ description: 'Access token for authentication', example: 'eyJhbGciOiJIUzI1NiIsInR...' })
    token: string;

    @Expose()
    @Type(() => UserDto)
    @ApiProperty({ type: () => UserDto })
    user: UserDto;
}
