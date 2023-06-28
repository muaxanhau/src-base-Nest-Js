import { SizeRepository } from "./size/repositories/size.repository"
import { SizeDetailRepository } from "./size/repositories/sizeDetail.repository"
import { SizeEntity } from "./size/size.entity"
import { SizeDetailEntity } from "./size/sizeDetail.entity"

const entities = [
    SizeEntity,
    SizeDetailEntity
]

export {
    SizeEntity,
    SizeDetailEntity
}

export {
    SizeRepository,
    SizeDetailRepository
}

export default entities