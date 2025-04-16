import { supabase } from "@/lib/supabase";

export async function getGalleries() {
  console.log("Fetching galleries from Supabase...");
  const { data, error } = await supabase.from("galleries").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function postGalleries(
  public_id: string,
  image_name: string,
  url: string,
  thumb_url: string
) {
  console.log("Inserting image to Supabase...", image_name);

  const { data, error } = await supabase
    .from("galleries")
    .insert([{ public_id, image_name, url, thumb_url }]) // Use public_id as the `id`
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteGalleries(id: number) {
  const confirm = window.confirm("Delete this image?");
  if (!confirm) return;

  const { error } = await supabase.from("galleries").delete().eq("id", id);
  if (error) throw error;
}
