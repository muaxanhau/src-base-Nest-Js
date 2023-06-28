import { IsNotEmpty, IsString } from 'class-validator'
import { SizeEntity } from 'src/entities'
import { SuccessResponseBaseModel } from 'src/models'

export class GetSizeByIdParamModel {
    @IsNotEmpty()
    @IsString()
    id: string
}

export type GetSizeByIdResponseModel = SuccessResponseBaseModel<SizeEntity>
