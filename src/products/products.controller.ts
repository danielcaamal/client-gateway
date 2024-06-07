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
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Get()
  async getProducts(@Query() paginationDto: PaginationDto) {
    // Method 1
    try {
      const products = await firstValueFrom(
        this.productsClient.send(
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
    return this.productsClient
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
    return this.productsClient
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
    return this.productsClient
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
    return this.productsClient
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
}
