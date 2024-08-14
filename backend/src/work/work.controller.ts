import { Controller, Get, Post, Body, Param, Delete, UploadedFile, UseInterceptors, Patch, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WorkService } from './work.service';
import { Work } from '../entities/work.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  // get all works
  @Get()
  async findAll(): Promise<Work[]> {
    console.log('Fetching all works...');
    const works = await this.workService.findAll();
    console.log('Works retrieved:', works);
    return works;
  }

  // get work by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Work> {
    console.log(`Fetching work with ID: ${id}`);
    const work = await this.workService.findOne(+id);
    if (!work) {
      console.error(`Work with ID ${id} not found`);
      throw new NotFoundException(`Work with ID ${id} not found`);
    }
    console.log('Work retrieved:', work);
    return work;
  }

  // create a new work 
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // save uploaded files
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname); // file extension
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        console.log(`Uploading file with filename: ${filename}`);
        cb(null, filename);
      },
    }),
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: any): Promise<Work> {
    console.log('Creating a new work with data:', body);
    if (file) {
      console.log('File uploaded:', file.filename);
    }
    const work = new Work();
    work.title = body.title;
    work.description = body.description;
    work.client_url = body.client_url;
    work.is_visible = body.is_visible !== undefined ? body.is_visible : true;

    if (file) {
      work.image_url = file.filename; // set filename 
    }

    const createdWork = await this.workService.create(work);
    console.log('New work created:', createdWork);
    return createdWork;
  }

  // update visibility by id
  @Patch(':id')
  async updateVisibility(@Param('id') id: string, @Body() body: { is_visible: boolean }): Promise<Work> {
    console.log(`Updating visibility for work with ID: ${id} to ${body.is_visible}`);
    const work = await this.workService.findOne(+id);
    if (!work) {
      console.error(`Work with ID ${id} not found`);
      throw new NotFoundException(`Work with ID ${id} not found`);
    }
    work.is_visible = body.is_visible;
    const updatedWork = await this.workService.update(work);
    console.log('Work updated:', updatedWork);
    return updatedWork;
  }

  // delete by id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    console.log(`Deleting work with ID: ${id}`);
    await this.workService.remove(+id);
    console.log(`Work with ID ${id} deleted`);
  }
}
