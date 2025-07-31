import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  create(createReportDto: CreateReportDto) {
    const report = this.reportsRepository.create(createReportDto);
    return this.reportsRepository.save(report);
  }

  findAll() {
    return this.reportsRepository.find();
  }

  findOne(id: number) {
    return this.reportsRepository.findOneBy({ id });
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    await this.reportsRepository.update(id, updateReportDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const report = await this.findOne(id);
    if (!report) {
      throw new Error('Report not found');
    }
    return this.reportsRepository.remove(report);
  }
}
