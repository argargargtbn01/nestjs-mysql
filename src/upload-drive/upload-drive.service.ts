import { Injectable } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';
import { Readable } from 'stream';
import { DRIVE_SCOPES, DRIVE_VERSION, FOLDER_ID } from './constants/upload-drive.constant';
import * as driveServiceAccount from './drive.config.json';
import { UploadFilesResponse } from './types/upload-drive.type';
import { GoogleAuth, JSONClient } from 'google-auth-library/build/src/auth/googleauth';

@Injectable()
export class UploadDriveService {
  private auth: GoogleAuth<JSONClient>;
  private drive: drive_v3.Drive;

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: driveServiceAccount.client_email,
        private_key: driveServiceAccount.private_key,
      },
      scopes: DRIVE_SCOPES,
    });

    this.drive = google.drive({ version: DRIVE_VERSION, auth: this.auth });
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<UploadFilesResponse> {
    const result: UploadFilesResponse = { success: [], failed: [] };
    const folderId = FOLDER_ID;
    for (const file of files) {
      try {
        const stream = new Readable();
        stream.push(file.buffer);
        stream.push(null);

        const response = await this.drive.files.create({
          requestBody: {
            name: file.originalname,
            mimeType: file.mimetype,
            parents: [folderId],
          },
          media: {
            mimeType: file.mimetype,
            body: stream,
          },
        });
        result.success.push(response.data);
      } catch (error) {
        result.failed.push({
          name: file.originalname,
          mineType: file.mimetype,
          error: error?.message,
        });
      }
    }
    return result;
  }

  async listFiles(): Promise<drive_v3.Schema$File[]> {
    const folderId = FOLDER_ID;
    const response = await this.drive.files.list({
      q: `'${folderId}' in parents`,
      fields:
        'files(id, mimeType, name, originalFilename, owners, hasThumbnail, thumbnailLink, webViewLink)',
    });
    return response.data.files;
  }

  async getFile(fileId: string): Promise<drive_v3.Schema$File> {
    const response = await this.drive.files.get({
      fileId,
      fields:
        'id, mimeType, name, originalFilename, owners, hasThumbnail, thumbnailLink, webViewLink',
    });
    return response.data;
  }
}
