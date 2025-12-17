import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './schemas/appointment.schema';
import { Model, Types } from 'mongoose';
import { BookAppointmentDto } from './dto/book-appointment.dto';
import { DoctorService } from '../doctor/doctor.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
    private readonly doctorService: DoctorService,
  ) {}

  async bookAppointment(userId: string, dto: BookAppointmentDto) {
    const { doctorId, date, time } = dto;

     // Check if doctor exists
  const doctor = await this.doctorService.findById(doctorId);
  if (!doctor) {
    throw new NotFoundException('Doctor not found');
  }

    const exists = await this.appointmentModel.findOne({
      doctorId,
      date,
      time,
    });

    if (exists) {
      throw new ConflictException('Slot already booked');
    }

    return this.appointmentModel.create({
      userId: new Types.ObjectId(userId),
      doctorId: new Types.ObjectId(doctorId),
      date,
      time,
    });
  }

  async getMyAppointments(userId: string) {
    return this.appointmentModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('doctorId', 'name specialization');
  }
}
