import { Type } from 'class-transformer';
import { OrderStatus } from '../enum';
import { IsEnum } from 'class-validator';

export class ChangeOrderStatusDto {
  @IsEnum(OrderStatus)
  @Type(() => String)
  status: OrderStatus = OrderStatus.PENDING;
}
