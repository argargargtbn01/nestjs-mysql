import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadDriveService } from './upload-drive.service';
import { drive_v3 } from 'googleapis';
import { UploadFilesResponse } from './types/upload-drive.type';

@Controller('drive')
export class UploadDriveController {
  constructor(private readonly driveService: UploadDriveService) {}

  @Post('files')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]): Promise<UploadFilesResponse> {
    return await this.driveService.uploadFiles(files);
  }

  @Get('files')
  async listFiles(@Query('folderId') folderId: string): Promise<drive_v3.Schema$File[]> {
    return await this.driveService.listFiles(folderId);
  }

  @Get('files/:fileId')
  async getFile(@Param('fileId') fileId: string): Promise<drive_v3.Schema$File> {
    return await this.driveService.getFile(fileId);
  }
}
