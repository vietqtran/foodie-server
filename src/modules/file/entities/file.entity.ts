import { S3File } from 'src/common/abstract/s3_file.abstract'
import { PCategory } from 'src/modules/p_categories/entities/p_category.entity'
import { Product } from 'src/modules/products/entities/product.entity'
import { RCategory } from 'src/modules/r_categories/entities/r_category.entity'
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { Entity, ManyToMany, ManyToOne, OneToOne } from 'typeorm'

@Entity()
export class File extends S3File {
    @OneToOne(() => User, (user) => user.avatar, { onDelete: 'CASCADE' })
    user: User

    @OneToOne(() => PCategory, (p_category) => p_category.image, { onDelete: 'CASCADE' })
    p_category: PCategory

    @ManyToMany(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
    product: Product[]

    @OneToOne(() => RCategory, (r_category) => r_category.image, { onDelete: 'CASCADE' })
    r_category: RCategory

    @OneToOne(() => Restaurant, (restaurant) => restaurant.avatar, { onDelete: 'CASCADE' })
    restaurant_avatar: Restaurant

    @OneToOne(() => Restaurant, (restaurant) => restaurant.cover, { onDelete: 'CASCADE' })
    restaurant_cover: Restaurant
}
