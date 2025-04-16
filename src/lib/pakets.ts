import { supabase } from "@/lib/supabase";

const toPostgresArray = (arr: string[]) =>
  `{${arr.map((item) => `"${item}"`).join(",")}}`;

export async function getPakets() {
  console.log("Fetching pakets from Supabase...");
  const { data, error } = await supabase.from("pakets").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function getPaketById(id: number) {
  const { data, error } = await supabase
    .from("pakets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function postPakets(paket: any) {
  console.log("Inserting paket to Supabase...", paket);

  const payload = {
    ...paket,
    includes: toPostgresArray(paket.includes),
    before_event: toPostgresArray(paket.before_event),
    on_event: toPostgresArray(paket.on_event),
  };

  const { data, error } = await supabase.from("pakets").insert([payload]);

  if (error) throw new Error(error.message);
  return data;
}

export async function deletePaket(id: number) {
  const { error } = await supabase.from("pakets").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function updatePaket(id: number, paket: any) {
  const { error } = await supabase.from("pakets").update(paket).eq("id", id);

  if (error) throw new Error(error.message);
}
