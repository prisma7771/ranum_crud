"use client";

import { useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { deleteGalleries, postGalleries } from "@/lib/galleries";
import { useContext } from "react";
import { AppDataContext } from "@/context/AppContext"; // Using context

export default function ListGalleries() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { galleries, setGalleries } = useContext(AppDataContext); // Use context here
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Trigger file input click
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // Handle file change for upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, PNG, or WEBP files are allowed.");
      return;
    }

    try {
      setLoading(true);

      // Upload image to Cloudinary
      const { public_id, url, thumb_url } = await uploadToCloudinary(file);

      // Save gallery image info to the database
      const saved = await postGalleries(public_id, file.name, url, thumb_url);

      // Update the galleries context to sync the new image
      setGalleries((prev) => [...prev, saved]);

      alert("Image uploaded and saved!");
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle gallery image delete
  const handleDelete = async (id: number, publicId: string) => {
    const confirm = window.confirm("Delete this image?");
    if (!confirm) return;

    setLoadingId(id);

    try {
      // Delete the image from Cloudinary
      const res = await fetch("/api/deleteCloudinaryImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete image from Cloudinary: ${text}`);
      }

      // Delete image record from the database
      await deleteGalleries(id);

      // Update the galleries context to remove the deleted image
      setGalleries((prev) => prev.filter((img) => img.id !== id));

      alert("Image deleted successfully!");
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="btn btn-sm btn-primary flex items-center gap-2"
          onClick={handleClickUpload}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </>
          ) : (
            <>
              <Plus size={16} />
              Add New
            </>
          )}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2">
        {galleries.map((img) => (
          <div
            key={img.id}
            className="relative group rounded overflow-hidden shadow-md"
          >
            <img
              src={img.thumb_url}
              alt="Gallery image"
              className="w-full h-36 object-fill"
            />

            <button
              onClick={() => handleDelete(img.id, img.public_id)}
              disabled={loadingId === img.id}
              className={`absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                loadingId === img.id ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
