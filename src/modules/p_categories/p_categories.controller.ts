import { Controller } from '@nestjs/common'
import { PCategoriesService } from './p_categories.service'

@Controller('p-categories')
export class PCategoriesController {
    constructor(private readonly pCategoriesService: PCategoriesService) {}
}
