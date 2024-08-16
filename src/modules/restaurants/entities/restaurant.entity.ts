import { AbstractEntity } from 'src/common/abstract/entity.abstract'
import { File } from 'src/modules/file/entities/file.entity'
import { Merchant } from 'src/modules/merchants/entities/merchant.entity'
import { RCategory } from 'src/modules/r_categories/entities/r_category.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm'

@Entity()
export class Restaurant extends AbstractEntity {
    @Column('text', { nullable: false })
    name: string

    @Column('text', { nullable: false })
    description: string

    @Column('boolean', { default: false })
    isPartner?: boolean

    @OneToOne(() => File, (file) => file.restaurant_avatar, {
        cascade: true,
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    avatar: File

    @OneToOne(() => File, (file) => file.restaurant_cover, {
        cascade: true,
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    cover: File

    @ManyToMany(() => RCategory, (category) => category.restaurants)
    @JoinTable({
        name: 'restaurant_category',
        joinColumn: {
            name: 'restaurantId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'categoryId',
            referencedColumnName: 'id',
        },
    })
    categories: RCategory[]

    @ManyToMany(() => User, (user) => user.favouriteRestaurants)
    @JoinTable({
        name: 'favourite_restaurant',
        joinColumn: {
            name: 'restaurantId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
    })
    users: User[]

    @ManyToOne(() => Merchant, (merchant) => merchant.restaurants)
    @JoinColumn({ name: 'merchantId' })
    merchant: Merchant
}
