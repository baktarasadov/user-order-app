import { IsNotEmpty, IsString, IsNumber, Min, Max, IsDecimal, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderCreate {
    @ApiProperty({
        description: 'Title of the order',
        example: 'New Smartphone',
    })
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @Matches(/^[A-Za-z0-9\s]+$/, {
        message: 'Title can only contain alphanumeric characters and spaces',
    })
    title: string;

    @ApiProperty({
        description: 'Detailed description of the order',
        example: 'This order includes a new smartphone with all accessories.',
    })
    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty({ message: 'Description cannot be empty' })
    @Matches(/^[A-Za-z0-9\s,.!?]+$/, {
        message: 'Description can only contain alphanumeric characters, spaces, and punctuation',
    })
    description: string;

    @ApiProperty({
        description: 'Price of the order in USD',
        example: '199.99',
    })
    @IsNumber({}, { message: 'Price must be a number' })
    @IsNotEmpty({ message: 'Price cannot be empty' })
    @Min(0, { message: 'Price must be a positive number' })
    @Max(10000, { message: 'Price must be less than 10,000' })

    price: number;
}
