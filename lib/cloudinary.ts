import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export async function uploadResumeToCloudinary(fileBuffer: Buffer, fileName: string, jobName: string): Promise<string> {
  // Sanitize job name for folder
  const folderName = jobName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `careers/${folderName}`,
        public_id: fileName,
        resource_type: "raw", // Use raw so PDFs and documents are served correctly without 401 errors
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Upload failed without error message."));
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}
