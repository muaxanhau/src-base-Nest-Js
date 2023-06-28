import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    BeforeUpdate,
    BeforeInsert,
    AfterLoad,
} from 'typeorm'
import { SizeDetailEntity } from './sizeDetail.entity'

@Entity({ name: 'sizes' })
export class SizeEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string

    @Column({ nullable: false })
    createAt: Date

    @Column({ nullable: true })
    endAt: Date

    @OneToMany(() => SizeDetailEntity, detail => detail.size)
    details: SizeDetailEntity[]

    @BeforeInsert()
    private setCreateAt() {
        this.createAt = new Date()
    }
}
