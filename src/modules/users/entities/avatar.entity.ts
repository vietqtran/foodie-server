import { AbstractEntity } from 'src/common/abstract/entity.abstract'
import { S3File } from 'src/common/abstract/s3_file.abstract'
import { Column, Entity, OneToOne } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Avatar extends S3File {
    @OneToOne(() => User, (user) => user.avatar, { onDelete: 'NO ACTION' })
    user: User
}
