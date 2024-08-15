import { S3File } from 'src/common/abstract/s3_file.abstract'
import { Entity, OneToOne } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Avatar extends S3File {
    @OneToOne(() => User, (user) => user.avatar, { onDelete: 'CASCADE' })
    user: User
}
