/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDTO } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  // async create(createSaleDto: CreateSaleDTO) {
  //   return this.prisma.sale.create({
  //     data: {
  //       ...createSaleDto,
  //     },
  //   });
  // }

  async create(
    createSaleDto: CreateSaleDTO,
    inventoryData?: {
      category?: string;
      flavor?: string;
    },
  ) {
    return this.prisma.$transaction(async (tx) => {
      let remainingStock: number | null = null;
      let inventoryItemId: string | any = null;

      if (inventoryData && (inventoryData.category || inventoryData.flavor)) {
        const inventoryItem = await tx.inventory.findFirst({
          where: {
            ...(inventoryData.category && { category: inventoryData.category }),
            ...(inventoryData.flavor && { flavor: inventoryData.flavor }),
          },
        });

        if (!inventoryItem) {
          throw new NotFoundException('Produto não encontrado no estoque');
        }

        if (inventoryItem.amount < createSaleDto.amount) {
          throw new BadRequestException('Quantidade insuficiente em estoque');
        }

        await tx.inventory.update({
          where: {
            id: inventoryItem.id,
          },
          data: {
            amount: inventoryItem.amount - createSaleDto.amount,
          },
        });

        remainingStock = inventoryItem.amount - createSaleDto.amount;
        inventoryItemId = inventoryItem.id;

        if ([5, 3, 1, 0].includes(remainingStock)) {
          console.log(
            `${inventoryData.category || ''} ${inventoryData.flavor || ''} possui apenas ${remainingStock} unidades em estoque`,
          );
        }
      }

      const sale = await tx.sale.create({
        data: {
          ...createSaleDto,
        },
      });

      return {
        ...sale,
        ...(remainingStock !== null && { remainingStock }),
        ...(inventoryItemId !== null && { inventoryItemId }),
      };
    });
  }

  async findAll() {
    return this.prisma.sale.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.sale.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<CreateSaleDTO>) {
    return this.prisma.sale.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.sale.delete({
      where: { id },
    });
  }
}
