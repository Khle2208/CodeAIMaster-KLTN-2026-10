import { Module } from '@nestjs/common';
import { CartDetailsService } from './cart-details.service';
import { CartDetailsController } from './cart-details.controller';

@Module({
  controllers: [CartDetailsController],
  providers: [CartDetailsService],
})
export class CartDetailsModule {}
