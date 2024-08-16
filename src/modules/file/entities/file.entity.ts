import { S3File } from 'src/common/abstract/s3_file.abstract'
import { PCategory } from 'src/modules/p_categories/entities/p_category.entity'
import { RCategory } from 'src/modules/r_categories/entities/r_category.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { Entity, OneToOne } from 'typeorm'

@Entity()
export class File extends S3File {
    @OneToOne(() => User, (user) => user.avatar, { onDelete: 'CASCADE' })
    user: User

    @OneToOne(() => PCategory, (p_category) => p_category.image, { onDelete: 'CASCADE' })
    p_category: PCategory

    @OneToOne(() => RCategory, (r_category) => r_category.image, { onDelete: 'CASCADE' })
    r_category: RCategory
}
