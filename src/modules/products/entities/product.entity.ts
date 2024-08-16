import { AbstractEntity } from "src/common/abstract/entity.abstract";
import { File } from "src/modules/file/entities/file.entity";
import { Column, Entity, JoinTable, OneToMany } from "typeorm";

@Entity()
export class Product extends AbstractEntity {
    @Column('varchar', { length: 255, nullable: false })
    name: string

    @Column('text', { nullable: false })
    description: string

    @Column('int', { nullable: false, default: 0 })
    soldQuantity: number

    @OneToMany(() => File, (file) => file.product)
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
}
