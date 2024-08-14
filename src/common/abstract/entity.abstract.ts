import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
}