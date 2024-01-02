import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UploadS3Module } from './upload-s3/upload-S3.module';
import { UploadDriveModule } from './upload-drive/upload-drive.module';
// console.log('node_env: ', process.env.NODE_ENV);
const databaseHost = process.env.NODE_ENV === 'Production' ? 'host.docker.internal' : 'localhost';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseHost,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    UploadS3Module,
    UploadDriveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
