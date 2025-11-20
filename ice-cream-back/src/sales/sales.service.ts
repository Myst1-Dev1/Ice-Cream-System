import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDTO } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDTO) {
    return this.prisma.sale.create({
      data: {
        ...createSaleDto,
      },
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
