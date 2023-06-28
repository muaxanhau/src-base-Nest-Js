import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    BeforeInsert,
    ManyToOne,
} from 'typeorm'
import { SizeEntity } from './size.entity'

@Entity({ name: 'size_details' })
export class SizeDetailEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Column({ nullable: false })
    createAt: Date

    @Column({ nullable: true })
    endAt: Date

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true, default: '' })
    description: string

    @ManyToOne(() => SizeEntity, size => size.details)
    size: SizeEntity

    @BeforeInsert()
    private setCreateAt() {
        this.createAt = new Date()
    }
}
