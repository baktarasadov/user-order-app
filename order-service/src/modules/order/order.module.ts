import { Module } from "@nestjs/common";
import { EntityMapper } from "src/common/mapper";
import { OrderController } from "./controllers/order.controller";
import { OrderService } from "./services/order.service";
import { OrderRepository } from "./repositories/order.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { AuthModule } from "../auth";

const controllers = [OrderController];

const imports = [
    TypeOrmModule.forFeature([OrderEntity]),
    AuthModule
];

const providers = [
    OrderService,
    EntityMapper,
    OrderRepository
];

@Module({
    controllers,
    imports,
    providers,
})
export class OrderModule { }