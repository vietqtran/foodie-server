import { IsEmail, MaxLength } from 'class-validator'
import { AbstractEntity } from 'src/common/abstract/entity.abstract'
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity()
export class Merchant extends AbstractEntity {
    @Column('varchar', { length: 255, nullable: false })
    @MaxLength(255, { message: 'Name is too long.' })
    name: string

    @Column('varchar', { length: 320, nullable: false })
    @IsEmail({}, { message: 'Invalid email.' })
    @MaxLength(320, { message: 'Email is too long.' })
    email: string

    @Column('varchar', { length: 15, nullable: false })
    phoneNumber: string

    @Column('text', { nullable: false, select: false })
    hashedPassword: string

    @Column('varchar', { length: 255, nullable: false })
    @MaxLength(255, { message: 'Owner name is too long.' })
    ownerName: string

    @Column('varchar', { length: 12, nullable: false })
    @MaxLength(12, { message: 'Owner identify ID is too long.' })
    ownerIdentifyID: string

    @Column('boolean', { default: false })
    isApproved: boolean

    @OneToMany(() => Restaurant, (restaurant) => restaurant.merchant)
    restaurants: Restaurant[]
}
