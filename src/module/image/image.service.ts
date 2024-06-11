import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ImageService {
  constructor(private firebaseService: FirebaseService) {}

  async uploadImage(
    file: Express.Multer.File,
    path: string,
    fileName: string,
    id: string,
  ): Promise<string> {
    const timestamp = Date.now();

    const storage = this.firebaseService.getFirestoreInstance();
    const bucket = storage.bucket();
    const fileUpload = bucket.file(`${path}/${id}/${timestamp}_${fileName}`);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        await fileUpload.makePublic();

        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${path}/${id}/${timestamp}_${fileName}`;
        console.log(imageUrl);
        resolve(imageUrl);
      });

      stream.end(file.buffer);
    });
  }
}
