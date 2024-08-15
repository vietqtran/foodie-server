import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsPhoneNumber, Validate } from 'class-validator'
import { User } from 'src/modules/users/entities/user.entity'

export abstract class LoginDto {
    @ApiProperty()
    password: string
}

export class LoginWithEmailDto extends LoginDto {
    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email.' })
    email: string
}

export class LoginWithPhoneNumberDto extends LoginDto {
    @ApiProperty()
    phoneNumber: string
}

export class LoginResponseDto {
    user: User
    tokens: {
        accessToken: string
        refreshToken: string
    }
}
