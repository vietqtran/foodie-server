import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./entity.abstract";
import { IsNumber, IsUrl, MaxLength } from "class-validator";

@Entity()
export abstract class S3File extends AbstractEntity {
    @Column('varchar', { length: 255, nullable: false })
    @MaxLength(255, { message: 'Invalid url.' })
    @IsUrl({}, { message: 'Invalid url.' })
    url: string

    @Column('varchar', { nullable: false })
    @MaxLength(255, { message: 'Invalid file name.' })
    fileName: string

    @Column('varchar', { length: 255, nullable: false })
    @MaxLength(255, { message: 'Invalid file path.' })
    filePath: string

    @Column('varchar', { length: 255, nullable: false })
    @MaxLength(255, { message: 'Invalid bucket.' })
    bucket: string

    @Column('varchar', { length: 255, nullable: false })
    @MaxLength(255, { message: 'Invalid file type.' })
    fileType: string

    @Column('int', { nullable: false })
    @IsNumber({}, { message: 'Invalid file size.' })
    fileSize: number
}