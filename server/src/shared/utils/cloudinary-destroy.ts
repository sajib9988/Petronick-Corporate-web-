import cloudinary from "../../config/cloudinary";


export const destroyImage = async (imageUrl: string) => {
  try {
    const urlParts = imageUrl.split("/");
    const uploadIndex = urlParts.indexOf("upload");

    if (uploadIndex === -1) return;

    const relevantParts = urlParts.slice(uploadIndex + 1);

    if (relevantParts[0]?.startsWith("v")) {
      relevantParts.shift();
    }

    const lastPart = relevantParts[relevantParts.length - 1];
    relevantParts[relevantParts.length - 1] = lastPart.split(".")[0];

    const publicId = relevantParts.join("/");

    await cloudinary.uploader.destroy(publicId);
  } catch {
    console.error("Failed to delete image from cloudinary:", imageUrl);
  }
};