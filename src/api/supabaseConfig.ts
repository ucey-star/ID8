import {createClient} from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type {Database} from "../types/database.types"


const supabaseURL:string| undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey:string|undefined = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabaseClient: SupabaseClient<Database> = createClient(supabaseURL, supabaseAnonKey);

export default supabaseClient;