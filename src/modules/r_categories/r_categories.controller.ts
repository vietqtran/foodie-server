import { Controller } from '@nestjs/common'
import { RCategoriesService } from './r_categories.service'

@Controller('r-categories')
export class RCategoriesController {
    constructor(private readonly rCategoriesService: RCategoriesService) {}
}
