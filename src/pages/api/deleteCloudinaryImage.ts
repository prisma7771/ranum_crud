// pages/api/deleteCloudinaryImage.ts

import { NextApiRequest, NextApiResponse } from "next";
import { deleteFromCloudinary } from "@/lib/cloudinary";

// Define the expected shape of the request body
interface DeleteRequestBody {
  publicId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Type assertion to specify the body structure
    const { publicId }: DeleteRequestBody = req.body;

    if (!publicId) {
      return res.status(400).json({ error: "publicId is required" });
    }

    try {
      const result = await deleteFromCloudinary(publicId);
      res.status(200).json({ success: true, result });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
