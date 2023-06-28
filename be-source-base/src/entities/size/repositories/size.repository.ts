import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    ARootRepositoryBaseModel,
    FunctionReturnRepositoryBaseModel,
} from 'src/models'
import { IsNull, Repository, Not } from 'typeorm'
import { SizeEntity } from '../size.entity'
import { SizeDetailEntity } from '../sizeDetail.entity'

@Injectable()
export class SizeRepository extends ARootRepositoryBaseModel<SizeEntity> {
    constructor(@InjectRepository(SizeEntity) private sizeRepository: Repository<SizeEntity>) {
        super()
    }

    async save(size: SizeEntity): FunctionReturnRepositoryBaseModel<SizeEntity> {
        try {
            const savedSize = await this.sizeRepository.save(size)
            return {
                success: true,
                data: savedSize,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async create(): FunctionReturnRepositoryBaseModel<SizeEntity> {
        const newSize = this.sizeRepository.create()

        const result = await this.save(newSize)

        return result
    }

    async getAll(relations: string[] = []): FunctionReturnRepositoryBaseModel<SizeEntity[]> {
        try {
            const sizes = await this.sizeRepository.find({ relations })
            return {
                success: true,
                data: sizes,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async getAllEnabled(relations: string[] = []): FunctionReturnRepositoryBaseModel<SizeEntity[]> {
        try {
            const sizes = await this.sizeRepository.find({
                where: {
                    endAt: IsNull(),
                },
                relations,
            })
            return {
                success: true,
                data: sizes,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async getAllDisabled(relations: string[] = []): FunctionReturnRepositoryBaseModel<SizeEntity[]> {
        try {
            const sizes = await this.sizeRepository.find({
                where: {
                    endAt: Not(IsNull()),
                },
                relations,
            })
            return {
                success: true,
                data: sizes,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    async getById(id: string, relations: string[] = []): FunctionReturnRepositoryBaseModel<SizeEntity> {
        try {
            const size = await this.sizeRepository.findOne({
                where: { id },
                relations,
            })
            return {
                success: true,
                data: size,
            }
        } catch (e) {
            return {
                success: false,
                data: null,
            }
        }
    }

    getByProperties(input: Object, relations?: string[]): FunctionReturnRepositoryBaseModel<SizeEntity> {
        throw new Error('Method not implemented.')
    }

    updateById(id: string, input: Object): FunctionReturnRepositoryBaseModel<null> {
        throw new Error('Method not implemented.')
    }

    async deleteById(id: string): FunctionReturnRepositoryBaseModel<null> {
        try {
            const { affected } = await this.sizeRepository.delete({ id })
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
            const { success: getByIdSuccess, data: size } = await this.getById(id)
            if (!getByIdSuccess) {
                return {
                    success: false,
                    data: null,
                }
            }

            const disabled = !!size.endAt
            if (disabled) {
                return {
                    success: true,
                    data: null,
                }
            }

            size.endAt = new Date()

            const { success } = await this.save(size)

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

    async getDetailsById(id: string) {
        const { success, data } = await this.getById(id, ['details'])
        if (!success) {
            return {
                success: false,
                data: null,
            }
        }

        return {
            success: true,
            data,
        }
    }

    async getDetailsEnabledById(id: string) {
        const { success, data: size } = await this.getDetailsById(id)
        if (!success) {
            return {
                success: false,
                data: null,
            }
        }

        const sizeDetailsEnabled = {
            ...size,
            details: size.details.filter(detail => !detail.endAt),
        } as SizeEntity
        return {
            success: true,
            data: sizeDetailsEnabled,
        }
    }

    async getDetailsDisabledById(id: string) {
        const { success, data: size } = await this.getDetailsById(id)
        if (!success) {
            return {
                success: false,
                data: null,
            }
        }

        const sizeDetailsDisabled = {
            ...size,
            details: size.details.filter(detail => !!detail.endAt),
        } as SizeEntity
        return {
            success: true,
            data: sizeDetailsDisabled,
        }
    }

    async addDetailById(id: string, detail: SizeDetailEntity): FunctionReturnRepositoryBaseModel<unknown> {
        try {
            const { success: getByIdSuccess, data: sizeData } = await this.getById(id, ['details'])
            if (!getByIdSuccess) {
                return {
                    success: false,
                    data: null,
                }
            }

            sizeData.details = [...sizeData.details, detail]
            const { success } = await this.save(sizeData)

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
}
