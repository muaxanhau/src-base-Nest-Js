import { SuccessResponseBaseModel } from 'src/models'
import {
    IsNotEmpty,
    IsString,
} from 'class-validator'

export class PutSizeParamModel {
    @IsNotEmpty()
    @IsString()
    id: string
}

export class PutSizeBodyModel {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string
}

export type PutSizeResponseModel = SuccessResponseBaseModel<null>
