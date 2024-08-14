import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./entity.abstract";

@Entity()
export class S3File extends AbstractEntity {
    @Column('varchar', { length: 255, nullable: false })
    url: string

    @Column('varchar', { nullable: false })
    fileName: string

    @Column('varchar', { length: 255, nullable: false })
    filePath: string

    @Column('varchar', { length: 255, nullable: false })
    bucket: string

    @Column('varchar', { length: 255, nullable: false })
    fileType: string

    @Column('int', { nullable: false })
    fileSize: number
}