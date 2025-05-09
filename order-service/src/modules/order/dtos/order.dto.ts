import { Expose } from 'class-transformer';
import { BaseDto } from 'src/modules/base';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto extends BaseDto {
    @Expose()
    @ApiProperty({
        description: 'Order title',
        example: 'New Book Order',
    })
    title: string;

    @Expose()
    @ApiProperty({
        description: 'Detailed description of the order',
        example: 'Order for 3 books about NestJS',
    })
    description: string;

    @Expose()
    @ApiProperty({
        description: 'Price of the order',
        example: 49.99,
    })
    price: number;
}
