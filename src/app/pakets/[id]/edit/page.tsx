import EditPaket from "@/components/page/pakets/editComponent/editPaket";
import { getPaketById } from "@/pages/api/pakets";

export default async function EditPaketPage({params}: {params: {id: string}}) {
    const id = parseInt(params.id, 10);
    const paket = await getPaketById(id);

    if (!paket) {
        return <div>Paket not found</div>;
    }

    return (
        <div className="p-4 bg-gray-200">
        <EditPaket paket={paket}/>
        </div>
    );
}