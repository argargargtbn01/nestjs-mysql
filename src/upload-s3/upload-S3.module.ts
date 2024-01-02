import { Module } from '@nestjs/common';
import { UploadS3Controller } from './upload-S3.controller';
import { UploadS3Service } from './upload-S3.service';

@Module({
  controllers: [UploadS3Controller],
  providers: [UploadS3Service],
})
export class UploadS3Module {}
