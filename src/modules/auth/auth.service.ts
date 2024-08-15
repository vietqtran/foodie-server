import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';
import { TokenPayload } from './types/token-payload.type';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto, LoginWithEmailDto, LoginWithPhoneNumberDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const { email, password, name, phoneNumber, username } = registerDto
    const user = await this.usersService.create({ email, password, name, phoneNumber, username: username ? username : email.split("@")[0] })
    const token = await this.generateAccessToken(user)
    return { user, token }
  }

  async loginWithEmail(loginWithEmailDto: LoginWithEmailDto): Promise<LoginResponseDto> {
    const { email, password } = loginWithEmailDto
    const user = await this.usersService.validateUser(email, null, password)
    const token = await this.generateAccessToken(user)
    return { user, token }
  }

  async loginWithPhoneNumber(loginWithPhoneNumberDto: LoginWithPhoneNumberDto): Promise<LoginResponseDto> {
    const { phoneNumber, password } = loginWithPhoneNumberDto
    const user = await this.usersService.validateUser(null, phoneNumber, password)
    const token = await this.generateAccessToken(user)
    return { user, token }
  }

  async generateAccessToken(user: User) {
    const tokenPayload: TokenPayload = {
      sub: user.id,
      name: user.username,
      email: user.email,
    }
    const token = await this.jwtService.signAsync(tokenPayload)
    return token
  }
}
