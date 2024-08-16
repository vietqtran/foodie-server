import { PartialType } from '@nestjs/swagger'
import { CreatePCategoryDto } from './create-p_category.dto'

export class UpdatePCategoryDto extends PartialType(CreatePCategoryDto) {}
