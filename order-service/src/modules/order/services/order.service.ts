import { EntityMapper } from 'src/common/mapper';
import {
    Injectable,
} from "@nestjs/common";
import { OrderRepository } from '../repositories/order.repository';
import { OrderCreate } from '../requests/order-create.request';
import { OrderDto } from '../dtos/order.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderUpdate } from '../requests/order-update.request';

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly entityMapper: EntityMapper,
    ) {
    }


    async create(userId: number, orderCreate: OrderCreate): Promise<OrderDto> {
        const data = await this.orderRepository.save(this.entityMapper.toEntity({ userId, ...orderCreate }, OrderEntity))
        return this.entityMapper.toDto(data, OrderDto)
    }

    async findAllByUserId(userId: number): Promise<OrderDto[]> {
        const data = await this.orderRepository.find({ where: { userId } })
        return this.entityMapper.toDtos(data, OrderDto)
    }

    async findByIdOrThrow(userId: number, orderId: number): Promise<OrderDto> {
        const data = await this.orderRepository.findOneOrThrow({
            where: { userId, id: orderId }
        })

        return this.entityMapper.toDto(data, OrderDto)
    }

    async deleteById(userId: number, orderId: number): Promise<void> {
        await this.findByIdOrThrow(userId, orderId)
        await this.orderRepository.deleteById(orderId)

    }

    async updateById(userId: number, orderId: number, orderUpdate: OrderUpdate): Promise<OrderDto> {
        await this.findByIdOrThrow(userId, orderId)
        const data = await this.orderRepository.updateById(
            orderId,
            this.entityMapper.toEntity(orderUpdate, OrderEntity)
        )
        return this.entityMapper.toDto(data, OrderDto)

    }

}