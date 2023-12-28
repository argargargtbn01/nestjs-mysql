import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Get('files')
  async listFiles(): Promise<any> {
    return await this.uploadService.listFiles();
  }

  @Get('files/:fileName')
  async getFile(@Param('fileName') fileName: string): Promise<any> {
    return await this.uploadService.getFile(fileName);
  }

  @Post('files')
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return await this.uploadService.uploadFile(file);
  }
}
