export type FunctionReturnServiceBaseModel<T> = Promise<{
    success: boolean,
    data: T
}>

export abstract class AServiceBaseModel {
    abstract create(...args: any): FunctionReturnServiceBaseModel<unknown>

    abstract getAll(): FunctionReturnServiceBaseModel<unknown>

    abstract getById(id: string): FunctionReturnServiceBaseModel<unknown>

    abstract updateById(id: string, data: Object): FunctionReturnServiceBaseModel<unknown>

    abstract deleteById(id: string): FunctionReturnServiceBaseModel<unknown>
}