import { AbstractEntity } from "src/common/abstract/entity.abstract";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Avatar } from "./avatar.entity";

@Entity()
export class User extends AbstractEntity {
    @Column("varchar", { length: 255, nullable: false })
    name: string

    @Column("varchar", { length: 320, unique: true, nullable: false })
    email: string

    @Column("varchar", { length: 255, unique: true, nullable: true, default: null })
    username?: string

    @Column("text", { nullable: false })
    hashedPassword: string

    @OneToOne(() => Avatar, (avatar) => avatar.user, { cascade: true })
    @JoinColumn()
    avatar?: Avatar
}
