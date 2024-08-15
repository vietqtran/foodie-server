import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { User } from 'src/modules/users/entities/user.entity'
import { UsersService } from 'src/modules/users/users.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            usernameField: 'email',
        })
    }
    async validate(email: string, password: string): Promise<User> {
        return this.userService.validateUser(email, null, password)
    }
}
