import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryService } from 'src/inventory/inventory.service';

@Module({
  providers: [SalesService, PrismaService, InventoryService],
  controllers: [SalesController],
})
export class SalesModule {}
