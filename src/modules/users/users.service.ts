import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { isValidPhoneNumber } from 'src/helpers/validate'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, username, phoneNumber } = createUserDto
        const isValidPhone = phoneNumber ? isValidPhoneNumber(phoneNumber) : true
        if (!isValidPhone) {
            throw new BadRequestException('Invalid phone number.')
        }
        const isDuplicatedUserInfor = await this.userRepository.findOne({
            where: [{ email }, { username }, { phoneNumber }],
        })
        if (isDuplicatedUserInfor) {
            throw new BadRequestException('Duplicated user infor.')
        }
        const hashedPassword = await this.hashPassword(password)
        const user = this.userRepository.create({ ...createUserDto, hashedPassword })
        const createdUser = await this.userRepository.save(user)
        delete createdUser.hashedPassword
        return createdUser
    }

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find({ relations: ['avatar'] })
        return users
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException('User not found.')
        }
        const updatedUser = await this.userRepository.save({ ...user, ...updateUserDto })
        if (!updatedUser) {
            throw new BadRequestException('Update user failed.')
        }
        return updatedUser
    }

    async remove(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException('User not found.')
        }
        const deletedUser = await this.userRepository.remove(user)
        if (!deletedUser) {
            throw new BadRequestException('Delete user failed.')
        }
        return deletedUser
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    async validateUser(email: string | null, phoneNumber: string | null, password: string): Promise<User> {
        if (!email && !phoneNumber) {
            throw new BadRequestException('Email or phone number is required.')
        }
        const filterQuery = email ? { email } : { phoneNumber }
        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.hashedPassword')
            .where(filterQuery)
            .getOne()
        if (!user) {
            throw new NotFoundException(email ? 'Email not found.' : 'Phone number not found.')
        }
        await this.validatePassword(password, user.hashedPassword)
        delete user.hashedPassword
        return user
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hashedPassword)
        if (!isMatch) {
            throw new BadRequestException('Invalid password.')
        }
        return isMatch
    }
}
