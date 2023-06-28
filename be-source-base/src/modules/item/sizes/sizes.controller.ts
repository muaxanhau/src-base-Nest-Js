import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
} from '@nestjs/common'
import { SizeService } from 'src/services'
import {
    GetSizeByIdParamModel,
    GetSizeByIdResponseModel,
    GetSizeResponseModel,
    PostSizeBodyModel,
    PostSizeResponseModel,
    PutSizeBodyModel,
    PutSizeParamModel,
    PutSizeResponseModel,
} from './models'

@Controller('/sizes')
export class SizesController {
    constructor(private readonly sizeService: SizeService) { }

    @Post()
    async postSize(@Body() body: PostSizeBodyModel): PostSizeResponseModel {
        const { name, description } = body

        const { success } = await this.sizeService.create({ name, description })
        if (!success) {
            throw new HttpException('server down.', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return {
            message: 'created.',
            data: null,
        }
    }

    @Get()
    async getSizes(): GetSizeResponseModel {
        const { success, data } = await this.sizeService.getAllEnabled()

        const sizes = data.map(size => {
            const currentDetail = size.details.filter(detail => !detail.endAt)?.[0]
            if (!currentDetail) {
                throw new HttpException('server down.', HttpStatus.INTERNAL_SERVER_ERROR)
            }

            return ({
                id: size.id,
                name: currentDetail.name,
                description: currentDetail.description
            })
        })

        if (!success) {
            throw new HttpException('server down.', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return {
            message: 'success.',
            data: sizes,
        }
    }

    @Get(':id')
    async getSizeById(@Param() param: GetSizeByIdParamModel): GetSizeByIdResponseModel {
        const { id } = param
        const { success, data } = await this.sizeService.getDisabledById(id)
        if (!success) {
            throw new HttpException('server down.', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return {
            message: 'success.',
            data,
        }
    }

    @Put(':id')
    async putSize(@Param() param: PutSizeParamModel, @Body() body: PutSizeBodyModel): PutSizeResponseModel {
        const { id } = param
        const { name, description } = body

        const { success } = await this.sizeService.updateById(id, { name, description })
        if (!success) {
            throw new HttpException('server down.', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return {
            message: 'success.',
            data: null,
        }
    }
}
