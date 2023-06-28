import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SizeDetailEntity, SizeDetailRepository, SizeEntity, SizeRepository } from 'src/entities'
import { SizeService, sizeServiceProvider } from 'src/services'
import { SizesController } from './sizes/sizes.controller'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SizeEntity,
            SizeDetailEntity
        ]),
    ],
    controllers: [SizesController],
    providers: [...sizeServiceProvider]
})
export class ItemModule { }
