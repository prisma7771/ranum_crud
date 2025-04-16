"use client";
import ListGalleries from "@/components/page/galleries/listGalleries";

export default function GalleriesPage() {


  return (
    <div className="p-2 bg-gray-200 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">🖼️ Galleries</h1>

        


      </div>

      <ListGalleries />
    </div>
  );
}
