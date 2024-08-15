import { ApiProperty } from "@nestjs/swagger";
import { Avatar } from "../entities/avatar.entity";

export class CreateAvatarDto {
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

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    username?: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ type: () => Avatar })
    avatar?: CreateAvatarDto
}
