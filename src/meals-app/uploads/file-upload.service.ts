// src/files/files.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async uploadFile(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    if (!file.originalname || !file.buffer) {
      throw new BadRequestException('File is missing required properties.');
    }

    try {
      const storage = this.firebaseService.getStorage();

      // Specify the directory where you want to store the images
      const directory = 'dishes';
      const storageRef = ref(storage, `${directory}/${file.originalname}`);

      const metadata = {
        contentType: file.mimetype, // Ensure `file.mimetype` is correctly set
      };

      await uploadBytes(storageRef, file.buffer, metadata);

      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(storageRef);
      const filedata = await getMetadata(storageRef);

      return { url: downloadURL, data: filedata };
    } catch (error) {
      // Handle errors that occur during the upload process
      throw new BadRequestException(`File upload failed: ${error.message}`);
    }
  }
}
