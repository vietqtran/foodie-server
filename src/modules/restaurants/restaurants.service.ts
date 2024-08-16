import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Restaurant } from './entities/restaurant.entity'
import { Repository } from 'typeorm'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'

@Injectable()
export class RestaurantsService {
    constructor(@InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>) {}

    async findAll(): Promise<Restaurant[]> {
        return this.restaurantRepository.find()
    }

    async findOne(id: string): Promise<Restaurant> {
        const restaurant = await this.restaurantRepository.findOne({ where: { id } })
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found')
        }
        return restaurant
    }

    async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        const isExistedName = await this.restaurantRepository.findOne({ where: { name: createRestaurantDto.name } })
        if (isExistedName) {
            throw new ConflictException('Restaurant name existed.')
        }
        const newRestaurant = this.restaurantRepository.create(createRestaurantDto)
        const savedRestaurant = await this.restaurantRepository.save(newRestaurant)
        return savedRestaurant
    }
}
