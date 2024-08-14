import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from '../entities/work.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,
  ) {}

  async findAll(): Promise<Work[]> {
    return this.workRepository.find();
  }

  async findOne(id: number): Promise<Work> {
    return this.workRepository.findOneBy({ id });
  }

  async create(work: Work): Promise<Work> {
    return this.workRepository.save(work);
  }

  async update(work: Work): Promise<Work> {
    return this.workRepository.save(work);
  }
  

  async remove(id: number): Promise<void> {
    await this.workRepository.delete(id);
  }
}