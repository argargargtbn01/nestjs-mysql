import { Controller, Get, Param, Post, UseInterceptors, Put, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadS3Service } from './upload-S3.service';
@Controller('s3')
export class UploadS3Controller {
  constructor(private readonly uploadS3Service: UploadS3Service) {}
  @Get('files')
  async listFiles(): Promise<any> {
    return await this.uploadS3Service.listFiles();
  }

  @Get('files/:fileName')
  async getFile(@Param('fileName') fileName: string): Promise<any> {
    return await this.uploadS3Service.getFile(fileName);
  }

  @Post('files')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]): Promise<any> {
    return await this.uploadS3Service.uploadFiles(files);
  }

  @Get('buckets/acl')
  async getBucketACL(): Promise<any> {
    return await this.uploadS3Service.getBucketACL();
  }

  @Put('buckets/acl')
  async putBucketACL(): Promise<any> {
    return await this.uploadS3Service.putBucketACL();
  }

  @Get('buckets/cors-rules')
  async getBucketCORSRules(): Promise<any> {
    return await this.uploadS3Service.getBucketCORSRules();
  }

  @Put('buckets/cors-rules')
  async putBucketCORSRules(): Promise<any> {
    return await this.uploadS3Service.putBucketCORSRules();
  }

  @Get('buckets/policy')
  async getBucketPolicy(): Promise<any> {
    return await this.uploadS3Service.getBucketPolicy();
  }

  @Put('buckets/policy')
  async putBucketPolicy(): Promise<any> {
    return await this.uploadS3Service.putBucketPolicy();
  }
}
