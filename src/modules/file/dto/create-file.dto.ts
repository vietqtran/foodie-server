import { ApiProperty } from '@nestjs/swagger'

export class CreateFileDto {
    @ApiProperty()
    url: string

    @ApiProperty()
    fileName: string

    @ApiProperty()
    filePath: string

    @ApiProperty()
    bucket: string

    @ApiProperty()
    fileType: string

    @ApiProperty()
    fileSize: number
}
