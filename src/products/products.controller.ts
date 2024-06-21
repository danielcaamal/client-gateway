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
import { ClientProxy } from '@nestjs/microservices';

import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  async getProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send(
      { cmd: 'find_all_products' },
      {
        ...paginationDto,
      },
    );
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    // Method 2
    return this.client.send(
      { cmd: 'find_one_product' },
      {
        id,
      },
    );
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send(
      { cmd: 'create_product' },
      {
        ...createProductDto,
      },
    );
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client.send(
      { cmd: 'update_product' },
      {
        ...updateProductDto,
        id,
      },
    );
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send(
      { cmd: 'remove_product' },
      {
        id,
      },
    );
  }

  @Post('populate')
  async populateProducts() {
    return this.client.send({ cmd: 'populate_products' }, {});
  }
}
