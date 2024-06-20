import { Module } from '@nestjs/common';

import { TransportsModule } from 'src/transports/transports.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [TransportsModule],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
