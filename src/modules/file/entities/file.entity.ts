import { S3File } from 'src/common/abstract/s3_file.abstract'
import { User } from 'src/modules/users/entities/user.entity'
import { Entity, OneToOne } from 'typeorm'

@Entity()
export class File extends S3File {
    @OneToOne(() => User, (user) => user.avatar, { onDelete: 'CASCADE' })
    user: User
}
