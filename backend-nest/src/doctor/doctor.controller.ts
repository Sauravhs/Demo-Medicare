import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './schemas/doctor.schema';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // Public API
  @Get()
  async getDoctors() {
    return this.doctorService.getAllDoctors();
  }

  // TEMP: create doctor
  @Post()
  async createDoctor(@Body() body: Partial<Doctor>) {
    return this.doctorService.createDoctor(body);
  }
}
