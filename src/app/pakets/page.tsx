import Link from "next/link";

import { Plus } from "lucide-react";
import ListPakets from "@/components/page/pakets/listPakets";

export default function PaketsPage() {
  return (
    <div className="p-2 bg-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📦 Pakets</h1>

        <Link
          href="/pakets/new"
          className="btn btn-sm btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Add New
        </Link>
      </div>
      <ListPakets />
    </div>
  );
}
