import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Work } from './entities/work.entity';
import { WorkModule } from './work/work.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'roundhouse.proxy.rlwy.net',  
      port: 53362,                        
      username: 'postgres',               
      password: 'LRukGBQioqTHezqnzDiuTbqgAxcYgtbY', 
      database: 'railway',                
      entities: [Work],
      synchronize: false,
      logging: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,  // if SSL needed
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    WorkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
