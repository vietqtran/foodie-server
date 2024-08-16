import { ApiProperty } from '@nestjs/swagger'
import { CreateFileDto } from 'src/modules/file/dto/create-file.dto'

export class CreateUserDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    email: string

    @ApiProperty()
    phoneNumber: string

    @ApiProperty()
    username?: string

    @ApiProperty()
    password: string

    @ApiProperty({ type: () => CreateFileDto })
    avatar?: CreateFileDto
}
