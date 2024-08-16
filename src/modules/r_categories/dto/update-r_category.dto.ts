import { PartialType } from '@nestjs/swagger'
import { CreateRCategoryDto } from './create-r_category.dto'

export class UpdateRCategoryDto extends PartialType(CreateRCategoryDto) {}
