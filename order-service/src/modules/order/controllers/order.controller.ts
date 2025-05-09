import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Get,
    Put,
    Delete,
    UseGuards,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';

import { API_VERSION } from 'src/common/constants';
import { OrderService } from '../services/order.service';
import { OrderCreate } from '../requests/order-create.request';
import { OrderDto } from '../dtos/order.dto';
import { ResponseEntity } from 'src/common/mapper/response-entity.mapper';
import { AuthGuard } from 'src/modules/auth';

@ApiTags('Order')
@Controller({
    path: 'orders',
    version: API_VERSION,
})
@UseGuards(AuthGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new order' })
    @ApiBody({ type: OrderCreate })
    @ApiResponse({
        status: 201,
        description: 'Order created successfully',
        type: OrderDto,
    })
    async create(@Body() orderCreate: OrderCreate) {
        try {
            const data = await this.orderService.create(1, orderCreate);

        } catch (error) {
            console.error(error)
        }
        return ResponseEntity.ok<OrderDto>()
            .setBody(null)
            .setMessage('Order created successfully');
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all orders of the user' })
    @ApiResponse({
        status: 200,
        description: 'Orders fetched successfully',
        type: [OrderDto],
    })
    async findAllByUserId() {
        const data = await this.orderService.findAllByUserId(1);
        return ResponseEntity.ok<OrderDto[]>()
            .setBody(data)
            .setMessage('Orders fetched successfully');
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get order by ID or throw if not found' })
    @ApiParam({ name: 'id', type: Number, required: true })
    @ApiResponse({
        status: 200,
        description: 'Order found successfully',
        type: OrderDto,
    })
    async findByIdOrThrow(@Param('id') orderId: number) {
        const data = await this.orderService.findByIdOrThrow(1, orderId);
        return ResponseEntity.ok<OrderDto>()
            .setBody(data)
            .setMessage('Order found successfully');
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update order by ID' })
    @ApiParam({ name: 'id', type: Number, required: true })
    @ApiBody({ type: OrderCreate })
    @ApiResponse({
        status: 200,
        description: 'Order updated successfully',
        type: OrderDto,
    })
    async updateById(
        @Param('id') orderId: number,
        @Body() orderUpdate: OrderCreate,
    ) {
        const data = await this.orderService.updateById(1, orderId, orderUpdate);
        return ResponseEntity.ok<OrderDto>()
            .setBody(data)
            .setMessage('Order updated successfully');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete order by ID' })
    @ApiParam({ name: 'id', type: Number, required: true })
    @ApiResponse({
        status: 200,
        description: 'Order deleted successfully',
    })
    async deleteById(@Param('id') orderId: number) {
        await this.orderService.deleteById(1, orderId);
        return ResponseEntity.ok()
            .setMessage('Order deleted successfully');
    }
}
