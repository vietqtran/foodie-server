import { ApiProperty } from '@nestjs/swagger'
import { CreateFileDto } from 'src/modules/file/dto/create-file.dto'

export class CreateRestaurantDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty({ type: () => CreateFileDto })
    avatar?: CreateFileDto

    @ApiProperty({ type: () => CreateFileDto })
    cover?: CreateFileDto
}
