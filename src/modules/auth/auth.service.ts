import { Body, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { RegisterDto, RegisterResponseDto } from './dto/register.dto'
import { User } from '../users/entities/user.entity'
import { TokenPayload } from './types/token-payload.type'
import { JwtService } from '@nestjs/jwt'
import { LoginResponseDto, LoginWithEmailDto, LoginWithPhoneNumberDto } from './dto/login.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
        const { email, password, name, phoneNumber, username } = registerDto
        const user = await this.usersService.create({
            email,
            password,
            name,
            phoneNumber,
            username: username ? username : email.split('@')[0],
        })
        const accessToken = await this.generateAccessToken(user)
        const refreshToken = await this.generateRefreshToken(user)
        return { user, tokens: { accessToken, refreshToken } }
    }

    async loginWithEmail(loginWithEmailDto: LoginWithEmailDto): Promise<LoginResponseDto> {
        const { email, password } = loginWithEmailDto
        const user = await this.usersService.validateUser(email, null, password)
        const accessToken = await this.generateAccessToken(user)
        const refreshToken = await this.generateRefreshToken(user)
        return { user, tokens: { accessToken, refreshToken } }
    }

    async loginWithPhoneNumber(loginWithPhoneNumberDto: LoginWithPhoneNumberDto): Promise<LoginResponseDto> {
        const { phoneNumber, password } = loginWithPhoneNumberDto
        const user = await this.usersService.validateUser(null, phoneNumber, password)
        const accessToken = await this.generateAccessToken(user)
        const refreshToken = await this.generateRefreshToken(user)
        return { user, tokens: { accessToken, refreshToken } }
    }

    async refreshToken(@Body() refreshToken: string): Promise<LoginResponseDto> {
        const { sub } = await this.jwtService.verify(refreshToken, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        })
        const user = await this.usersService.findOne(sub)
        const accessToken = await this.generateAccessToken(user)
        const newRefreshToken = await this.generateRefreshToken(user)
        return { user, tokens: { accessToken, refreshToken: newRefreshToken } }
    }

    async generateAccessToken(user: User) {
        const tokenPayload: TokenPayload = {
            sub: user.id,
            name: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
        }
        const token = await this.jwtService.signAsync(tokenPayload)
        return token
    }

    async generateRefreshToken(user: User) {
        const tokenPayload: TokenPayload = {
            sub: user.id,
            name: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
        }
        const token = await this.jwtService.signAsync(tokenPayload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: `${this.configService.get<string>('JWT_REFRESH_EXPIRE_IN')}s`,
        })
        return token
    }
}
