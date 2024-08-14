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
      host: 'roundhouse.proxy.rlwy.net',  // Host-ul bazei de date
      port: 53362,                        // Portul bazei de date
      username: 'postgres',               // Utilizatorul bazei de date
      password: 'LRukGBQioqTHezqnzDiuTbqgAxcYgtbY', // Parola bazei de date
      database: 'railway',                // Numele bazei de date
      entities: [Work],
      synchronize: false,
      logging: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,  // Dacă baza de date necesită SSL
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
