import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UploadService {
  private s3;
  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
      endpoint: `https://usc1.contabostorage.com`,
      forcePathStyle: true,
      region: 'US-central',
    });
  }
  async uploadFile(file: Express.Multer.File): Promise<any> {
    if (!file) {
      return { status: 'error', message: 'No file uploaded' };
    }

    const { originalname, mimetype, buffer } = file;

    try {
      const params = {
        Body: buffer,
        Bucket: 'sonat-storage',
        Key: originalname,
        ContentType: mimetype,
      };
      const comand = new PutObjectCommand(params);
      return await this.s3.send(comand);
      // return await getSignedUrl(this.s3, new PutObjectCommand(params), { expiresIn: 3600 });

      return { status: 'success', message: 'File uploaded successfully' };
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  async listFiles(): Promise<any> {
    try {
      const params = {
        Bucket: 'sonat-storage',
      };
      const comand = new ListObjectsV2Command(params);
      const res = await this.s3.send(comand);
      const contents = res.Contents;
      for (const content of contents) {
        content.signedUrl = await getSignedUrl(
          this.s3,
          new GetObjectCommand({ Bucket: 'sonat-storage', Key: content.Key }),
          { expiresIn: 3600 },
        );
      }
      return contents;
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  async getFile(fileName: string): Promise<any> {
    try {
      const params = {
        Bucket: 'sonat-storage',
        Key: fileName,
      };
      // const comand = new GetObjectCommand(params);
      // const sendCommand = await this.s3.send(comand);
      // return sendCommand.Body.transformToString();
      return await getSignedUrl(this.s3, new GetObjectCommand(params), { expiresIn: 3600 });
    } catch (error) {
      return { status: 'error', message: error };
    }
  }
}
