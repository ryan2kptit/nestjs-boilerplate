import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetListUserDto {
    @ApiProperty({
        required: false,
        description: "user's name"
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}