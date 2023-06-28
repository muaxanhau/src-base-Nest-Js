import { SuccessResponseBaseModel } from 'src/models'
import {
    IsNotEmpty,
    IsString,
} from 'class-validator'

export class PostSizeBodyModel {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string
}

export type PostSizeResponseModel = SuccessResponseBaseModel<null>
