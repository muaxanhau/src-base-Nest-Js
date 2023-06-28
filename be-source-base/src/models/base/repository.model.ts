export type FunctionReturnRepositoryBaseModel<T> = Promise<{
    success: boolean,
    data: T
}>

export abstract class ARepositoryBaseModel<T> {
    abstract save(data: T): FunctionReturnRepositoryBaseModel<T>
    abstract create(...args: any): FunctionReturnRepositoryBaseModel<T>
    abstract getAll(relations?: string[]): FunctionReturnRepositoryBaseModel<T[]>
    abstract getAllEnabled(relations?: string[]): FunctionReturnRepositoryBaseModel<T[]>
    abstract getAllDisabled(relations?: string[]): FunctionReturnRepositoryBaseModel<T[]>
    abstract getById(id: string, relations?: string[]): FunctionReturnRepositoryBaseModel<T>
    abstract getByProperties(input: Object, relations?: string[]): FunctionReturnRepositoryBaseModel<T>
    abstract updateById(id: string, input: Object): FunctionReturnRepositoryBaseModel<null>
    abstract disableById(id: string): FunctionReturnRepositoryBaseModel<null>
    abstract deleteById(id: string): FunctionReturnRepositoryBaseModel<null>
}

export abstract class ARootRepositoryBaseModel<T> extends ARepositoryBaseModel<T> {
    abstract getDetailsById(id: string): FunctionReturnRepositoryBaseModel<unknown>
    abstract getDetailsEnabledById(id: string): FunctionReturnRepositoryBaseModel<unknown>
    abstract getDetailsDisabledById(id: string): FunctionReturnRepositoryBaseModel<unknown>
    abstract addDetailById(id: string, input: Object): FunctionReturnRepositoryBaseModel<unknown>
}

export abstract class ADetailRepositoryBaseModel<T> extends ARepositoryBaseModel<T> {
    abstract getByRootId(id: string): FunctionReturnRepositoryBaseModel<T[]>
    abstract getEnabledByRootId(id: string): FunctionReturnRepositoryBaseModel<T[]>
    abstract getDisabledByRootId(id: string): FunctionReturnRepositoryBaseModel<T[]>
}