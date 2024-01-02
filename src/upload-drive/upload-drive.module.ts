import { Module } from '@nestjs/common';
import { UploadDriveController } from './upload-drive.controller';
import { UploadDriveService } from './upload-drive.service';

@Module({
  controllers: [UploadDriveController],
  providers: [UploadDriveService],
})
export class UploadDriveModule {}
