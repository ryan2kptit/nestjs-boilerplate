import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'name',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({
    description: 'email',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: 'expired_date',
  })
  @IsString()
  @MaxLength(100)
  expired_date: string;

  @ApiPropertyOptional({
    description: 'country',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country: string;

  @ApiPropertyOptional({
    description: 'city',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiPropertyOptional({
    description: 'postalCode',
  })
  @IsOptional()
  @IsInt()
  postalCode: number;

  @ApiPropertyOptional({
    description: 'phone',
  })
  @IsOptional()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(15)
  phone: string;
}
