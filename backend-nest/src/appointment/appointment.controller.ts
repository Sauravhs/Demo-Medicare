import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AuthGuard } from '../auth/auth.guard';
import { BookAppointmentDto } from './dto/book-appointment.dto';
import type { AuthenticatedRequest } from '../auth/auth.types';

@Controller('appointments')
@UseGuards(AuthGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async book(
    @Request() req: AuthenticatedRequest,
    @Body() dto: BookAppointmentDto,
  ) {
    return this.appointmentService.bookAppointment(req.user.sub, dto);
  }

  @Get('my')
  async myAppointments(@Request() req: AuthenticatedRequest) {
    return this.appointmentService.getMyAppointments(req.user.sub);
  }

  // Optional test route (can remove later)
  @Get('test')
  test() {
    return {
      message: 'Appointment module is working ✅',
    };
  }
}
