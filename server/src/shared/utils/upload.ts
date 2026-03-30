import multer from "multer";
import cloudinary from "../../config/cloudinary";
import { UploadApiResponse } from "cloudinary";

const storage = multer.memoryStorage();

export const multerUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, jpeg, png, webp, svg files are allowed"));
    }
  },
});

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `petronick/${folder}`,
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Cloudinary upload failed"));
          } else {
            resolve(result);
          }
        },
      )
      .end(fileBuffer);
  });
};

export const uploadLogo = multerUpload.single("logo");
export const uploadSectionImage = multerUpload.single("image");