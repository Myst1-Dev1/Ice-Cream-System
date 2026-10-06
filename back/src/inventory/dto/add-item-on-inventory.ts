import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddItemOnInventoryDTO {
  @IsNotEmpty()
  @IsString()
  category!: string;

  @IsNotEmpty()
  @IsString()
  flavor!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;
}
