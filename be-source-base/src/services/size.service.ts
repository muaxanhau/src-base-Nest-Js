import {
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    Scope,
} from '@nestjs/common'
import { SizeDetailEntity, SizeDetailRepository, SizeRepository } from 'src/entities'
import { AServiceBaseModel, FunctionReturnServiceBaseModel } from 'src/models'
import { CreateSizeModel, UpdateByIdSizeModel } from './models'

@Injectable()
export class SizeService extends AServiceBaseModel {

    constructor(
        @Inject(SizeRepository) private sizeRepositoty: SizeRepository,
        @Inject(SizeDetailRepository)
        private detailRepositoty: SizeDetailRepository,
    ) {
        super()
    }

    async create({ name, description }: CreateSizeModel) {
        const {
            success: createDetailSuccess,
            data: detailData,
        } = await this.detailRepositoty.create({ name, description })
        if (!createDetailSuccess) {
            throw new HttpException('server down.', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const {
            success: createSizeSuccess,
            data: sizeData,
        } = await this.sizeRepositoty.create()
        if (!createSizeSuccess) {
            throw new HttpException('server down.', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const { success, data } = await this.sizeRepositoty.addDetailById(sizeData.id, detailData)
        if (!success) {
            throw new HttpException('server down.', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return { success, data }
    }

    getAll() {
        return this.sizeRepositoty.getAll(['details'])
    }

    getAllEnabled() {
        return this.sizeRepositoty.getAllEnabled(['details'])
    }

    getAllDisabled() {
        return this.sizeRepositoty.getAllDisabled(['details'])
    }

    getById(id: string) {
        return this.sizeRepositoty.getDetailsById(id)
    }

    getEnabledById(id: string) {
        return this.sizeRepositoty.getDetailsEnabledById(id)
    }

    getDisabledById(id: string) {
        return this.sizeRepositoty.getDetailsDisabledById(id)
    }

    async updateById(id: string, {
        name,
        description
    }: UpdateByIdSizeModel) {
        const { success: getDetailsBySizeIdSuccess, data: details } = await this.detailRepositoty.getEnabledByRootId(id)
        if (!getDetailsBySizeIdSuccess) {
            return {
                success: false,
                data: null
            }
        }

        const isExisted = !!details.filter(detail => detail.name === name && detail.description === description).length
        if (isExisted) {
            return {
                success: true,
                data: null
            }
        }

        const hasDetailEnabled = !!details.length
        if (hasDetailEnabled) {
            const currentDetail = details[0]
            const { success: disableByIdSuccess } = await this.detailRepositoty.disableById(currentDetail.id)
            if (!disableByIdSuccess) {
                return {
                    success: false,
                    data: null
                }
            }
        }

        const { success: createDetailSuccess, data: newDetail } = await this.detailRepositoty.create({ name, description })
        if (!createDetailSuccess) {
            return {
                success: false,
                data: null
            }
        }

        const { success } = await this.sizeRepositoty.addDetailById(id, newDetail)
        if (!success) {
            return {
                success: false,
                data: null
            }
        }

        return {
            success: true,
            data: null,
        }
    }

    deleteById(id: string): FunctionReturnServiceBaseModel<null> {
        throw new Error('Method not implemented.')
    }
}

export const sizeServiceProvider = [
    SizeService,
    SizeRepository,
    SizeDetailRepository,
]
