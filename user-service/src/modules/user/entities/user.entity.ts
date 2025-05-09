import { BaseEntity } from 'src/modules/base';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column({ name: 'user_name', type: 'varchar', length: 100, unique: true })
    userName: string;

    @Column({ name: 'password', type: 'varchar', length: 255 })
    password: string;

}