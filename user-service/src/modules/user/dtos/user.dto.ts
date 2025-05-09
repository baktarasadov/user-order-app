import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { BaseDto } from "src/modules/base";

export class UserDto extends BaseDto {
    @ApiProperty({ example: "johndoe", description: "The username of the user" })
    @Expose()
    userName: string;

    @Exclude()
    password: string;

}