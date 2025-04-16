"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { AppDataContext } from "@/context/AppContext";
import { Edit, Trash2 } from "lucide-react";
import { deletePaket } from "@/lib/pakets";

export default function ListPakets() {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // ✅ Only grab pakets from context
  const { pakets, setPakets } = useContext(AppDataContext);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this paket?"
    );
    if (!confirm) return;

    try {
      setLoadingId(id);
      await deletePaket(id);

      // Update context after deletion
      setPakets((prev) => prev.filter((paket) => paket.id !== id));

      alert("Paket deleted successfully!");
    } catch (err: any) {
      alert("Failed to delete paket: " + err.message);
    } finally {
      setLoadingId(null);
    }
  };

  // Sorting pakets by id
  const sortedPakets = pakets.sort((a: any, b: any) => a.id - b.id);

  return (
    <div className="m-4 bg-white">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Bonus</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPakets.map((paket, index) => (
              <tr key={paket.id || index} className="hover:bg-base-300">
                <th>{index + 1}</th>
                <td>{paket.name}</td>
                <td>{paket.price}</td>
                <td>{paket.bonus}</td>
                <td className="flex gap-2">
                  <Link href={`/pakets/${paket.id}/edit`}>
                    <button className="btn btn-sm btn-ghost text-blue-500">
                      <Edit size={16} />
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(paket.id)}
                    className={`btn btn-sm btn-ghost text-red-500 ${
                      loadingId === paket.id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={loadingId === paket.id}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
