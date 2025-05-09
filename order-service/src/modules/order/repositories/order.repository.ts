import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/modules/base';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
    ) {
        super(orderRepository);
    }
}