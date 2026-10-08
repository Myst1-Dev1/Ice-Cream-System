import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddItemOnInventoryDTO } from './dto/add-item-on-inventory';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async addItemOnInventory(data: AddItemOnInventoryDTO) {
    return this.prisma.inventory.create({
      data: {
        ...data,
      },
    });
  }

  async findAllItensOnInventory() {
    return this.prisma.inventory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findItemByFlavor(flavor: string) {
    return this.prisma.inventory.findMany({
      where: {
        flavor: {
          contains: flavor,
          mode: 'insensitive',
        },
      },
    });
  }

  async update(id: number, data: Partial<AddItemOnInventoryDTO>) {
    return this.prisma.inventory.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.inventory.delete({
      where: { id },
    });
  }
}
