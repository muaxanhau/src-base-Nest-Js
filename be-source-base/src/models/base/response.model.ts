export type SuccessResponseBaseModel<T> = Promise<{
    message: string | string[]
    data: T
}>

export type ExceptionResponseBaseModel = {
    statusCode: number
    method: string
    path: string
    timestamp: Date
    message: string | string[]
}
