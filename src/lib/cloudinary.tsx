// lib/cloudinary/uploadToCloudinary.ts
import CryptoJS from "crypto-js";

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "tgyz0ytn"); // 🔁 Replace with your actual preset
  formData.append("folder", "gallery"); // optional: customize folder if needed

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/drnwrt6wf/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) throw new Error(data.error?.message || "Upload failed");

  const thumbUrl = data.secure_url.replace(
    "/upload/",
    "/upload/w_300,q_auto,f_webp/"
  );

  return {
    public_id: data.public_id,
    url: data.secure_url,
    thumb_url: thumbUrl,
  };
};

export const deleteFromCloudinary = async (publicId: string) => {
  const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY as string;
  const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET as string;
  const cloudinaryCloudName = process.env.CLOUDINARY_NAME as string;

  // Ensure environment variables are defined
  if (!cloudinaryApiKey || !cloudinaryApiSecret || !cloudinaryCloudName) {
    throw new Error("Cloudinary environment variables are not properly set.");
  }

  const timestamp = Math.round(new Date().getTime() / 1000); // Get current timestamp
  const signature = generateSignature(publicId, timestamp, cloudinaryApiSecret);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/destroy`,
      {
        method: "POST",
        body: JSON.stringify({
          public_id: publicId,
          api_key: cloudinaryApiKey,
          timestamp: timestamp,
          signature: signature,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error?.message || "Failed to delete image from Cloudinary");

    return data;
  } catch (err: any) {
    console.error("Error deleting image:", err.message);
    throw new Error(err.message);
  }
};


export const generateSignature = (
  publicId: string,
  timestamp: number,
  apiSecret: string
) => {
  // ✅ Correct string to sign
  const signatureString = `public_id=${publicId}&timestamp=${timestamp}`;

  // ✅ SHA1 hash, HEX output (not base64)
  return CryptoJS.SHA1(signatureString + apiSecret).toString(CryptoJS.enc.Hex);
};

