import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() body: CreateDoctorDto) {
    return this.doctorService.createDoctor(body);
  }

  @Get()
  async findAll() {
    return this.doctorService.getAllDoctors();
  }
}
