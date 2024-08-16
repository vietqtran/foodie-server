import { ApiProperty } from '@nestjs/swagger'
import { CreateFileDto } from 'src/modules/file/dto/create-file.dto'

export class CreatePCategoryDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty({ type: () => CreateFileDto })
    image?: CreateFileDto
}
