import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AddItemOnInventoryDTO } from './dto/add-item-on-inventory';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('add')
  addItemOnInventory(@Body() item: AddItemOnInventoryDTO) {
    return this.inventoryService.addItemOnInventory(item);
  }

  @Get()
  findAllItensOnInventory() {
    return this.inventoryService.findAllItensOnInventory();
  }

  @Get(':flavor')
  findItemByFlavor(@Param('flavor') flavor: string) {
    return this.inventoryService.findItemByFlavor(flavor);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<AddItemOnInventoryDTO>,
  ) {
    return this.inventoryService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.remove(id);
  }
}
