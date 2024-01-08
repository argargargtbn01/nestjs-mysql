import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './authentication/auth.module';
import { UploadS3Module } from './upload-s3/upload-S3.module';
import { UploadDriveModule } from './upload-drive/upload-drive.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { CaslModule } from './casl/casl.module';
// console.log('node_env: ', process.env.NODE_ENV);
const databaseHost = process.env.NODE_ENV === 'Production' ? 'host.docker.internal' : 'localhost';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: databaseHost,
      port: 5432,
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
    AuthorizationModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
