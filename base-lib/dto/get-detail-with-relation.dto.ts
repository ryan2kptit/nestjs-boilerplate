import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetDetailRelation {
    @ApiProperty({default: ''})
    @IsString()
    @IsOptional()
    relations: string
}