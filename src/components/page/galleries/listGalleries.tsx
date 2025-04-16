"use client";

import { useRef } from "react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteGalleries, getGalleries, postGalleries } from "@/lib/galleries";
import { uploadToCloudinary } from "@/lib/cloudinary";
// import { deleteFromCloudinary } from "@/lib/cloudinary";  // No longer needed

interface Gallery {
  id: number;
  public_id: string;
  image_name: string;
  url: string;
  thumb_url: string;
}

export default function ListGalleries() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const data = await getGalleries();
      setGalleries(data || []);
    } catch (err: any) {
      console.error("Failed to fetch galleries:", err.message);
    }
  };

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
      setLoading(true);

      const { public_id, url, thumb_url } = await uploadToCloudinary(file);
      const saved = await postGalleries(public_id, file.name, url, thumb_url);

      setGalleries((prev) => [...prev, saved]);

      alert("Image uploaded and saved!");
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Your component with the delete button (ListGalleries)
  const handleDelete = async (id: number, publicId: string) => {
    const confirm = window.confirm("Delete this image?");
    if (!confirm) return;

    setLoading(true);

    try {
      const res = await fetch("/api/deleteCloudinaryImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete image from Cloudinary: ${text}`);
      }

      await deleteGalleries(id);
      setGalleries((prev) => prev.filter((img) => img.id !== id));

      alert("Image deleted successfully!");
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setLoading(false);
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
