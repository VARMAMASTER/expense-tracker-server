import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
  UploadMetadata,
} from 'firebase/storage';
import { Model } from 'mongoose';
import { FirebaseService } from '../firebase/firebase.service';
import { Media, MediaDocument } from '../schemas/media-object.schema';
import { UploadFileDto } from './dto/upload-file';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly firebaseService: FirebaseService,
    @InjectModel(Media.name, 'meals-app')
    private readonly mediaModel: Model<MediaDocument>,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    body: UploadFileDto,
  ): Promise<any> {
    if (!file || !file.originalname || !file.buffer) {
      throw new BadRequestException('File is missing required properties.');
    }

    try {
      // Upload file to Firebase and get the download URL and metadata
      const { downloadURL, fileData } = await this.uploadFileToFirebase(file);

      // Save media data to the database
      const newMedia = await this.saveMediaToDatabase(
        body,
        file.originalname,
        downloadURL,
      );

      // Return the response
      return {
        Success: true,
        message: 'Image uploaded successfully',
        url: downloadURL,
        data: fileData,
        media: newMedia,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  // Abstract function to upload file to Firebase Storage
  private async uploadFileToFirebase(
    file: Express.Multer.File,
  ): Promise<{ downloadURL: string; fileData: any }> {
    const storage = this.firebaseService.getStorage();
    const directory = 'dishes'; // Specify the directory
    const storageRef = ref(storage, `${directory}/${file.originalname}`);
    const metadata: UploadMetadata = {
      contentType: file.mimetype,
    };

    await uploadBytes(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    const fileData = await getMetadata(storageRef);

    return { downloadURL, fileData };
  }

  // Abstract function to save media object to the database
  private async saveMediaToDatabase(
    body: UploadFileDto,
    originalFileName: string,
    fileUrl: string,
  ): Promise<MediaDocument> {
    const newMedia = new this.mediaModel({
      CategoryId: body.CategoryId,
      type: body.type,
      subType: body.subType,
      fileUrl,
      originalFileName,
    });

    return newMedia.save(); // Save the media object to the database
  }
}
