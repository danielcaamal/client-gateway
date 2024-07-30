import { Module } from '@nestjs/common';

import { TransportsModule } from 'src/transports/transports.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [TransportsModule],

  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
