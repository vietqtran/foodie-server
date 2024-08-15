import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export abstract class AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
}
