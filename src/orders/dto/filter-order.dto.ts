import { PaginationDto } from 'src/common';
import { OrderStatus } from '../enum';
import { IsEnum, IsOptional } from 'class-validator';

export class FilterOrderDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
