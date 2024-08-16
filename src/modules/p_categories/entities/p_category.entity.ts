import { AbstractEntity } from 'src/common/abstract/entity.abstract'
import { File } from 'src/modules/file/entities/file.entity'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

@Entity()
export class PCategory extends AbstractEntity {
    @Column()
    name: string

    @Column()
    description: string

    @OneToOne(() => File, (file) => file.p_category, {
        cascade: true,
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    image?: File
}
