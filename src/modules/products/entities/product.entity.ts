import { AbstractEntity } from "src/common/abstract/entity.abstract";
import { File } from "src/modules/file/entities/file.entity";
import { PCategory } from "src/modules/p_categories/entities/p_category.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Product extends AbstractEntity {
    @Column('varchar', { length: 255, nullable: false })
    name: string

    @Column('text', { nullable: false })
    description: string

    @Column('int', { nullable: false, default: 0 })
    soldQuantity: number

    @ManyToMany(() => File, (file) => file.product)
    @JoinTable({
        name: 'product_images',
        joinColumn: {
            name: 'productId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'imageId',
            referencedColumnName: 'id',
        },
    })
    images: File[]

    @ManyToMany(() => PCategory, (pCategory) => pCategory.products)
    @JoinTable({
        name: 'product_categories',
        joinColumn: {
            name: 'productId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'categoryId',
            referencedColumnName: 'id',
        },
    })
    categories: PCategory[]
}
