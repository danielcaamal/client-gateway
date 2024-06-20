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

import { NATS_SERVICE } from 'src/config';
import { ChangeOrderStatusDto, CreateOrderDto, FilterOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  async getOrders(@Query() filterOrderDto: FilterOrderDto) {
    return this.client
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
    return this.client
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
    return this.client
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
    return this.client
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
