import { SuccessResponseBaseModel } from 'src/models'

export type GetSizeResponseModel = SuccessResponseBaseModel<{
    id: string
    name: string
    description: string
}[]>
