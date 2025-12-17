import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsNumber()
  @IsNotEmpty()
  fee: number;
}
