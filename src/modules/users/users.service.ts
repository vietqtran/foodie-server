import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto)
    const { email, password } = createUserDto
    const isExistedEmail = await this.userRepository.findOne({ where: { email } })
    console.log(isExistedEmail)
    if (!!isExistedEmail) {
      throw new BadRequestException("Enail is existed.")
    }
    const hashedPassword = await this.hashPassword(password)
    const user = this.userRepository.create({ ...createUserDto, hashedPassword })
    const createdUser = await this.userRepository.save(user)
    return createdUser
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({})
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
      throw new NotFoundException("User not found.")
    }
    const updatedUser = await this.userRepository.save({ ...user, ...updateUserDto })
    if (!updatedUser) {
      throw new BadRequestException("Update user failed.")
    }
    return updatedUser
  }

  async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    const deletedUser = await this.userRepository.remove(user)
    if (!deletedUser) {
      throw new BadRequestException("Delete user failed.")
    }
    return deletedUser
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }
}
