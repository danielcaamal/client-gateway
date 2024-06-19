import { catchError } from 'rxjs';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { ORDER_SERVICE } from 'src/config';
import { ChangeOrderStatusDto, CreateOrderDto, FilterOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Get()
  async getOrders(@Query() filterOrderDto: FilterOrderDto) {
    return this.ordersClient
      .send(
        { cmd: 'find_all_orders' },
        {
          ...filterOrderDto,
        },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient
      .send(
        { cmd: 'find_one_order' },
        {
          id,
        },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient
      .send(
        { cmd: 'create_order' },
        {
          ...createOrderDto,
        },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':id')
  async changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeOrderStatus: ChangeOrderStatusDto,
  ) {
    return this.ordersClient
      .send(
        { cmd: 'change_order_status' },
        {
          ...changeOrderStatus,
          id,
        },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
