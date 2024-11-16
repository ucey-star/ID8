
/* eslint-disable @typescript-eslint/no-explicit-any */  
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";



export async function createClient() {
	// eslint-disable-next-line @typescript-eslint/await-thenable
	const cookieStore = await cookies();

	// Create a server's supabase client with newly configured cookie,
	// which could be used to maintain user's session

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options),
						);
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
}
