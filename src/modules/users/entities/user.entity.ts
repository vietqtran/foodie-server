import { AbstractEntity } from 'src/common/abstract/entity.abstract'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Avatar } from './avatar.entity'
import { IsEmail, MaxLength } from 'class-validator'

@Entity()
export class User extends AbstractEntity {
    @Column('varchar', { length: 255, nullable: false })
    @MaxLength(255, { message: 'Name is too long.' })
    name: string

    @Column('varchar', { length: 320, nullable: true, default: null })
    @IsEmail({}, { message: 'Invalid email.' })
    @MaxLength(320, { message: 'Email is too long.' })
    email: string

    @Column('varchar', { length: 15, nullable: true, default: null })
    phoneNumber: string

    @Column('varchar', { length: 255, unique: true, nullable: true, default: null })
    @MaxLength(255, { message: 'Username is too long.' })
    username?: string

    @Column('text', { nullable: false, select: false })
    hashedPassword: string

    @OneToOne(() => Avatar, (avatar) => avatar.user, {
        cascade: true,
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    avatar?: Avatar
}
