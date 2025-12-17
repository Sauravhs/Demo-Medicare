import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from './schemas/doctor.schema';
import { Model } from 'mongoose';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<Doctor>,
  ) {}

  async getAllDoctors() {
    return this.doctorModel.find();
  }

  // Optional: for seeding or admin use
  async createDoctor(data: Partial<Doctor>) {
    return this.doctorModel.create(data);
  }
}
