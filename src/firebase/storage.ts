import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from './config';

export const uploadFile = async (
  path: string,
  file: File
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};

export const uploadFileWithProgress = (
  path: string,
  file: File,
  onProgress: (progress: number) => void
) => {
  return new Promise<string>((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

export const deleteFile = async (path: string) => {
  try {
    await deleteObject(ref(storage, path));
  } catch (error) {
    throw error;
  }
};

export const generateStoragePath = (folder: string, fileName: string): string => {
  const timestamp = Date.now();
  return `${folder}/${timestamp}_${fileName}`;
};
