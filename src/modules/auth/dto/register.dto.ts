import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { User } from "src/modules/users/entities/user.entity";

export class RegisterDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    username?: string;

    @ApiProperty()
    password: string;
}

export class RegisterResponseDto {
    user: User;
    token: string;
}