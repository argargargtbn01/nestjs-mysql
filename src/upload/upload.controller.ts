import { Controller, Get, Param, Post, UseInterceptors, Put, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
@Controller('s3')
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
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]): Promise<any> {
    return await this.uploadService.uploadFiles(files);
  }

  @Get('buckets/acl')
  async getBucketACL(): Promise<any> {
    return await this.uploadService.getBucketACL();
  }

  @Put('buckets/acl')
  async putBucketACL(): Promise<any> {
    return await this.uploadService.putBucketACL();
  }

  @Get('buckets/cors-rules')
  async getBucketCORSRules(): Promise<any> {
    return await this.uploadService.getBucketCORSRules();
  }

  @Put('buckets/cors-rules')
  async putBucketCORSRules(): Promise<any> {
    return await this.uploadService.putBucketCORSRules();
  }

  @Get('buckets/policy')
  async getBucketPolicy(): Promise<any> {
    return await this.uploadService.getBucketPolicy();
  }

  @Put('buckets/policy')
  async putBucketPolicy(): Promise<any> {
    return await this.uploadService.putBucketPolicy();
  }
}
