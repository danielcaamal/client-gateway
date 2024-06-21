import { Module } from '@nestjs/common';

import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { TransportsModule } from './transports/transports.module';

@Module({
  imports: [ProductsModule, OrdersModule, TransportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
