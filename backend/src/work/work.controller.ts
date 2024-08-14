import { Controller, Get, Post, Body, Param, Delete, UploadedFile, UseInterceptors, Patch, NotFoundException  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WorkService } from './work.service';
import { Work } from '../entities/work.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  findAll(): Promise<Work[]> {
    return this.workService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Work> {
    return this.workService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        cb(null, filename);
      },
    }),    
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: any): Promise<Work> {
    const work = new Work();
    work.title = body.title;
    work.description = body.description;
    work.client_url = body.client_url;
    work.is_visible = body.is_visible !== undefined ? body.is_visible : true;

    if (file) {
      work.image_url = file.filename;
    }

    return this.workService.create(work);
  }

  @Patch(':id')
  async updateVisibility(@Param('id') id: string, @Body() body: { is_visible: boolean }): Promise<Work> {
    const work = await this.workService.findOne(+id);
    if (!work) {
      throw new NotFoundException(`Work with ID ${id} not found`);
    }
    work.is_visible = body.is_visible;
    return this.workService.update(work);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.workService.remove(+id);
  }
}
