import { AbstractEntity } from 'src/common/abstract/entity.abstract'
import { File } from 'src/modules/file/entities/file.entity'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

@Entity()
export class RCategory extends AbstractEntity {
    @Column('varchar', { length: 255 })
    name: string

    @Column('text')
    description: string

    @OneToOne(() => File, (file) => file.r_category, {
        cascade: true,
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    image?: File
}
