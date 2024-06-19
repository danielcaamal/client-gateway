import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatus } from '../enum';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  totalItems: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  @Type(() => String)
  status: OrderStatus = OrderStatus.PENDING;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  paid?: boolean = false;
}
