import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/modules/base';

@Entity('orders')
export class OrderEntity extends BaseEntity {
    @Expose()
    @Column({
        name: 'title',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    title: string;

    @Expose()
    @Column({
        name: 'description',
        type: 'text',
        nullable: true,
    })
    description: string;

    @Expose()
    @Column({
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @Column({
        name: 'user_id',
        type: 'int',
        nullable: false,
    })
    userId: number;
}
