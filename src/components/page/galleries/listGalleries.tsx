"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteGalleries, getGalleries } from "@/pages/api/galleries";
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

// Your component with the delete button (ListGalleries)

const handleDelete = async (id: number, publicId: string) => {
  const confirm = window.confirm("Delete this image?");
  if (!confirm) return;

  setLoadingId(id); // Set loading state to show user is deleting

  try {
    // First, delete from Cloudinary by calling the API route
    const res = await fetch("/api/deleteCloudinaryImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    // Check if the response is valid
    if (!res.ok) {
      const text = await res.text();  // Get the response as text
      throw new Error(`Failed to delete image from Cloudinary: ${text}`);
    }

    const data = await res.json();  // Parse as JSON if it's valid

    // Now, delete from Supabase
    await deleteGalleries(id);

    // Optionally, update local state or reload the page
    setGalleries(prev => prev.filter(img => img.id !== id));

    alert("Image deleted successfully!");
  } catch (err: any) {
    alert("Delete failed: " + err.message);
  } finally {
    setLoadingId(null); // Reset loading state after operation
  }
};

  

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2">
      {galleries.map((img) => (
        <div
          key={img.id}
          className="relative group rounded overflow-hidden shadow-md bg-white"
        >
          <img
            src={img.thumb_url}
            alt="Gallery image"
            className="w-full h-auto object-cover"
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
  );
}
