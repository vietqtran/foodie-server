import { AbstractEntity } from 'src/common/abstract/entity.abstract'
import { File } from 'src/modules/file/entities/file.entity'
import { Product } from 'src/modules/products/entities/product.entity'
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm'

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

    @ManyToMany(() => Product, (product) => product.categories, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    products: Product[]
}
