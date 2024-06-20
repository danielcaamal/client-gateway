import { Module } from '@nestjs/common';

import { TransportsModule } from 'src/transports/transports.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [TransportsModule],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
