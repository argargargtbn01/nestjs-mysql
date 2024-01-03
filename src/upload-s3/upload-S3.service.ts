import {
  GetBucketAclCommand,
  GetBucketCorsCommand,
  GetBucketPolicyCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutBucketAclCommand,
  PutBucketCorsCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
const BUCKET = 'sonat-storage';
@Injectable()
export class UploadS3Service {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
      endpoint: process.env.S3_END_POINT,
      forcePathStyle: true,
      region: 'US-central',
    });
  }
  async uploadFiles(files: Express.Multer.File[]): Promise<any> {
    if (files.length === 0) {
      return { status: 'error', message: 'No file uploaded' };
    }

    try {
      for (const file of files) {
        const { originalname, mimetype, buffer } = file;

        const params = {
          Body: buffer,
          Bucket: BUCKET,
          Key: originalname,
          ContentType: mimetype,
        };
        const command = new PutObjectCommand(params);
        await this.s3.send(command);
      }
      return { status: 'success', message: 'Files uploaded successfully' };
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  // async listFiles(prefix = ''): Promise<any> {
  //   try {
  //     const params = {
  //       Bucket: BUCKET,
  //       Prefix: prefix,
  //       Delimiter: '/',
  //     };
  //     const command = new ListObjectsCommand(params);
  //     const res = await this.s3.send(command);
  //     const files = res.Contents || [];
  //     const folders = res.CommonPrefixes || [];

  //     const result = [];

  //     for (const file of files) {
  //       const tenantId = file.Owner.ID.split('$')[0];
  //       file['PublicUrl'] = `${process.env.S3_END_POINT}/${tenantId}:${BUCKET}/${file.Key}`;
  //       if (file.Size > 0) result.push(file); // because folder ( = prefix) has size = 0
  //     }

  //     for (const folder of folders) {
  //       const subFiles = await this.listFiles(folder.Prefix);
  //       subFiles.filter((subFile) => {
  //         if (subFile.Key !== folder.Prefix) {
  //           result.push({
  //             Key: folder.Prefix,
  //             children: subFiles,
  //           });
  //         }
  //       });
  //     }

  //     return result;
  //   } catch (error) {
  //     return { status: 'error', message: error };
  //   }
  // }

  async listFiles(prefix = ''): Promise<any> {
    try {
      const params = {
        Bucket: BUCKET,
        Prefix: prefix,
        Delimiter: '/',
      };
      const command = new ListObjectsCommand(params);
      const res = await this.s3.send(command);
      const files = res.Contents || [];
      const folders = res.CommonPrefixes || [];

      const result = files
        .filter((file) => file.Size > 0)
        .map((file) => {
          const tenantId = file.Owner.ID.split('$')[0];
          file['PublicUrl'] = `${process.env.S3_END_POINT}/${tenantId}:${BUCKET}/${file.Key}`;
          return file;
        });

      const folderResults = folders.map(async (folder) => {
        const subFiles = await this.listFiles(folder.Prefix);
        const validSubFiles = subFiles.filter((subFile) => subFile.Key !== folder.Prefix);
        return {
          Key: folder.Prefix,
          children: validSubFiles,
        };
      });

      return [...result, ...(await Promise.all(folderResults))];
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  async getFile(fileName: string): Promise<any> {
    try {
      const params = {
        Bucket: BUCKET,
        Key: fileName,
      };
      const command = new GetObjectCommand(params);
      await this.s3.send(command);
      return { status: 'success', message: 'Get file successfully' };
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  async getBucketACL(): Promise<any> {
    try {
      const params = {
        Bucket: BUCKET,
        // Key: fileName,
      };
      const command = new GetBucketAclCommand(params);
      const sendCommand = await this.s3.send(command);
      return sendCommand;
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  async putBucketACL(): Promise<any> {
    try {
      const command = new PutBucketAclCommand({
        Bucket: BUCKET,
        AccessControlPolicy: {
          Grants: [
            // {
            //   Grantee: {
            //     // Specify the group "AllUsers" to grant access to everyone
            //     URI: 'http://acs.amazonaws.com/groups/global/AllUsers',
            //     Type: 'Group',
            //   },
            //   Permission: 'READ',
            // },
            {
              Grantee: {
                ID: process.env.S3_MY_OWNER_ID,
                Type: 'CanonicalUser',
              },
              Permission: 'FULL_CONTROL',
            },
          ],
          Owner: {
            ID: process.env.S3_MY_OWNER_ID,
          },
        },
      });
      const sendCommand = await this.s3.send(command);
      return sendCommand;
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  async getBucketCORSRules(): Promise<any> {
    try {
      const params = {
        Bucket: BUCKET,
      };
      const command = new GetBucketCorsCommand(params);
      const res = await this.s3.send(command);
      return res;
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  async putBucketCORSRules(): Promise<any> {
    try {
      const command = new PutBucketCorsCommand({
        Bucket: BUCKET,
        CORSConfiguration: {
          CORSRules: [
            {
              AllowedHeaders: ['*'],
              // Allow only GET and PUT methods to be sent to this bucket.
              AllowedMethods: ['GET', 'PUT'],
              AllowedOrigins: ['*'],
            },
          ],
        },
      });
      const sendCommand = await this.s3.send(command);
      return sendCommand;
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  async getBucketPolicy(): Promise<any> {
    try {
      const params = {
        Bucket: BUCKET,
      };
      const command = new GetBucketPolicyCommand(params);
      const res = await this.s3.send(command);
      return res;
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  async putBucketPolicy(): Promise<any> {
    try {
      const command = new PutBucketPolicyCommand({
        Policy: JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: '*',
              Action: 's3:GetObject',
              Resource: 'arn:aws:s3:::sonat-storage/*',
            },
          ],
        }),
        Bucket: BUCKET,
      });
      const sendCommand = await this.s3.send(command);
      return sendCommand;
    } catch (error) {
      return { status: 'error', message: error };
    }
  }
}
