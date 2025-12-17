import { IsMongoId, IsNotEmpty } from 'class-validator';

export class BookAppointmentDto {
  @IsMongoId()
  doctorId: string;

  @IsNotEmpty()
  date: string; // "2025-12-20"

  @IsNotEmpty()
  time: string; // "10:00"
}
