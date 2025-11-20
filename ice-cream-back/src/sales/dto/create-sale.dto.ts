/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

enum SaleType {
  VENDA = 'venda',
  ENTRADA = 'entrada',
}

export class CreateSaleDTO {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  flavor: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(SaleType)
  type: SaleType;
}
