import { drive_v3 } from 'googleapis';

export type UploadFilesResponse = {
  success: drive_v3.Schema$File[];
  failed: { name: string; mineType: string; error: string }[];
};
