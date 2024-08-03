import { Module } from '@nestjs/common';

import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { TransportsModule } from './transports/transports.module';
import { AuthModule } from './auth/auth.module';
import { HealthCheckController } from './health-check/health-check.controller';

@Module({
  imports: [ProductsModule, OrdersModule, TransportsModule, AuthModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
