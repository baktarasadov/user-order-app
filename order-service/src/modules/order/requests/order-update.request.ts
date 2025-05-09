import { PartialType } from "@nestjs/mapped-types";
import { OrderCreate } from "./order-create.request";

export class OrderUpdate extends PartialType(OrderCreate) { }