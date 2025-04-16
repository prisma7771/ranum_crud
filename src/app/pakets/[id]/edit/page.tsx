import EditPaket from "@/components/page/pakets/editComponent/editPaket";
import { getPaketById } from "@/lib/pakets";

type EditPaketPageProps = {
  params: Promise<{ id: string }>; // Mark params as a Promise of the actual object
};

export default async function EditPaketPage({ params }: EditPaketPageProps) {
  // Await params before using them
  const { id } = await params; // Await the Promise that params is wrapped in

  const paketId = parseInt(id, 10); // Parse the ID as an integer
  const paket = await getPaketById(paketId); // Fetch the paket data based on the parsed id

  if (!paket) {
    // If no paket is found, return a message
    return <div>Paket not found</div>;
  }

  return (
    <div className="p-4 bg-gray-200">
      <EditPaket paket={paket} />
    </div>
  );
}
