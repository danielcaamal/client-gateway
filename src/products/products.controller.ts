import { catchError, firstValueFrom } from 'rxjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  async getProducts(@Query() paginationDto: PaginationDto) {
    // Method 1
    try {
      const products = await firstValueFrom(
        this.client.send(
          { cmd: 'find_all_products' },
          {
            ...paginationDto,
          },
        ),
      );
      return products;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    // Method 2
    return this.client
      .send(
        { cmd: 'find_one_product' },
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
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client
      .send(
        { cmd: 'create_product' },
        {
          ...createProductDto,
        },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send(
        { cmd: 'update_product' },
        {
          ...updateProductDto,
          id,
        },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client
      .send(
        { cmd: 'remove_product' },
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

  @Post('populate')
  async populateProducts() {
    return this.client.send({ cmd: 'populate_products' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
