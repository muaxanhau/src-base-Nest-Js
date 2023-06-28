import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    ADetailRepositoryBaseModel,
    FunctionReturnRepositoryBaseModel,
} from 'src/models'
import { IsNull, Not, Repository } from 'typeorm'
import { SizeDetailEntity } from '../sizeDetail.entity'
import {
    CreateInputSizeDetailModel,
    GetByPropertiesInputSizeDetailModel,
    UpdateByIdInputSizeDetailModel,
} from './models'

@Injectable()
export class SizeDetailRepository extends ADetailRepositoryBaseModel<SizeDetailEntity> {
    constructor(@InjectRepository(SizeDetailEntity) private sizeDetailRepository: Repository<SizeDetailEntity>) {
        super()
    }

    async save(detail: SizeDetailEntity): FunctionReturnRepositoryBaseModel<SizeDetailEntity> {
        try {
            const savedDetail = await this.sizeDetailRepository.save(detail)
            return {
                success: true,
                data: savedDetail,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async create(input: CreateInputSizeDetailModel): FunctionReturnRepositoryBaseModel<SizeDetailEntity> {
        const { name, description } = input
        const newDetail = this.sizeDetailRepository.create({ name, description })

        const result = await this.save(newDetail)

        return result
    }

    async getAll(): FunctionReturnRepositoryBaseModel<SizeDetailEntity[]> {
        try {
            const details = await this.sizeDetailRepository.find()
            return {
                success: true,
                data: details,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async getAllEnabled(): FunctionReturnRepositoryBaseModel<SizeDetailEntity[]> {
        try {
            const details = await this.sizeDetailRepository.findBy({
                endAt: IsNull(),
            })
            return {
                success: true,
                data: details,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async getAllDisabled(): FunctionReturnRepositoryBaseModel<SizeDetailEntity[]> {
        try {
            const details = await this.sizeDetailRepository.findBy({
                endAt: Not(IsNull()),
            })
            return {
                success: true,
                data: details,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async getById(id: string): FunctionReturnRepositoryBaseModel<SizeDetailEntity> {
        try {
            const detail = await this.sizeDetailRepository.findOneBy({ id })
            return {
                success: true,
                data: detail,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async getByProperties(input: GetByPropertiesInputSizeDetailModel): FunctionReturnRepositoryBaseModel<SizeDetailEntity> {
        const { name, description } = input
        try {
            const detail = await this.sizeDetailRepository.findOneBy({
                name,
                description,
            })
            return {
                success: true,
                data: detail,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async updateById(id: string, input: UpdateByIdInputSizeDetailModel): FunctionReturnRepositoryBaseModel<null> {
        const { name, description } = input
        try {
            const { affected } = await this.sizeDetailRepository.update(
                { id },
                { name, description },
            )
            const success = !!affected

            return {
                success,
                data: null,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async deleteById(id: string): FunctionReturnRepositoryBaseModel<null> {
        try {
            const { affected } = await this.sizeDetailRepository.delete({ id })
            const success = !!affected

            return {
                success,
                data: null,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async disableById(id: string): FunctionReturnRepositoryBaseModel<null> {
        try {
            const { success: getByIdSuccess, data: detail } = await this.getById(id)
            if (!getByIdSuccess) {
                return {
                    success: false,
                    data: null,
                }
            }

            const disabled = !!detail.endAt
            if (disabled) {
                return {
                    success: true,
                    data: null,
                }
            }

            detail.endAt = new Date()

            const { success } = await this.save(detail)

            return {
                success,
                data: null,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async getByRootId(id: string): FunctionReturnRepositoryBaseModel<SizeDetailEntity[]> {
        try {
            const details = await this.sizeDetailRepository.findBy({ id })
            return {
                success: true,
                data: details,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async getEnabledByRootId(id: string): FunctionReturnRepositoryBaseModel<SizeDetailEntity[]> {
        try {
            const detailsEnabled = await this.sizeDetailRepository.findBy({
                id,
                endAt: IsNull(),
            })
            return {
                success: true,
                data: detailsEnabled,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async getDisabledByRootId(id: string): FunctionReturnRepositoryBaseModel<SizeDetailEntity[]> {
        try {
            const detailsDisabled = await this.sizeDetailRepository.findBy({
                id,
                endAt: Not(IsNull()),
            })
            return {
                success: true,
                data: detailsDisabled,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }
}
