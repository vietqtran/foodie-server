import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RegisterDto } from './dto/register.dto'
import { Public } from 'src/common/decorators/public.decorator'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { LoginWithEmailDto, LoginWithPhoneNumberDto } from './dto/login.dto'
import { User } from '../users/entities/user.entity'
import JwtRefreshGuard from './guard/jwt-refresh.guard'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
@ApiTags('AUTH')
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    @Public()
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto)
    }

    @Post('/login/email')
    @Public()
    async loginWithEmail(@Body() loginWithEmailDto: LoginWithEmailDto) {
        return await this.authService.loginWithEmail(loginWithEmailDto)
    }

    @Post('/login/phone')
    @Public()
    async loginWithPhoneNumber(@Body() loginWithPhoneNumberDto: LoginWithPhoneNumberDto) {
        return await this.authService.loginWithPhoneNumber(loginWithPhoneNumberDto)
    }

    @Post('/refresh')
    @UseGuards(JwtRefreshGuard)
    @Public()
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return await this.authService.refreshToken(refreshTokenDto.refreshToken)
    }

    @Get('/me')
    async me(@CurrentUser() user: User) {
        console.log(user)
        return user
    }
}
