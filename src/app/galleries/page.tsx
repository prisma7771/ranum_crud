"use client";

import { useRef } from "react";
import { Plus } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { postGalleries } from "@/pages/api/galleries";
import ListGalleries from "@/components/page/galleries/listGalleries";

export default function GalleriesPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, PNG, or WEBP files are allowed.");
      return;
    }

    try {
      const { public_id, url, thumb_url } = await uploadToCloudinary(file);

      const saved = await postGalleries(public_id, file.name, url, thumb_url);

      console.log("✅ Gallery Saved:", saved);
      alert("Image uploaded and saved!");
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Upload failed: " + err.message);
    }
  };

  return (
    <div className="p-2 bg-gray-200 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">🖼️ Galleries</h1>

        <button
          className="btn btn-sm btn-primary flex items-center gap-2"
          onClick={handleClickUpload}
        >
          <Plus size={16} />
          Add New
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <ListGalleries />
    </div>
  );
}
