import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from '../entities/work.entity';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  providers: [WorkService],
  controllers: [WorkController],
})
export class WorkModule {}