export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			Comments: {
				Row: {
					comment_id: string;
					content: string | null;
					created_at: string;
					project_id: string | null;
					user_id: string | null;
				};
				Insert: {
					comment_id?: string;
					content?: string | null;
					created_at?: string;
					project_id?: string | null;
					user_id?: string | null;
				};
				Update: {
					comment_id?: string;
					content?: string | null;
					created_at?: string;
					project_id?: string | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "Comments_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "Projects";
						referencedColumns: ["project_id"];
					},
				];
			};
			Project_Attachments: {
				Row: {
					attachment_id: string;
					attachment_url: string | null;
					created_at: string;
					project_id: string | null;
					uploaded_at: string | null;
				};
				Insert: {
					attachment_id?: string;
					attachment_url?: string | null;
					created_at?: string;
					project_id?: string | null;
					uploaded_at?: string | null;
				};
				Update: {
					attachment_id?: string;
					attachment_url?: string | null;
					created_at?: string;
					project_id?: string | null;
					uploaded_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "Project_Attachments_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "Projects";
						referencedColumns: ["project_id"];
					},
				];
			};
			Project_Engagement: {
				Row: {
					comments: number | null;
					created_at: string;
					engagement_id: string;
					likes: number | null;
					project_id: string;
					shares: number | null;
					updated_at: string | null;
					views: number | null;
				};
				Insert: {
					comments?: number | null;
					created_at?: string;
					engagement_id?: string;
					likes?: number | null;
					project_id?: string;
					shares?: number | null;
					updated_at?: string | null;
					views?: number | null;
				};
				Update: {
					comments?: number | null;
					created_at?: string;
					engagement_id?: string;
					likes?: number | null;
					project_id?: string;
					shares?: number | null;
					updated_at?: string | null;
					views?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "Project_Engagement_project_id_fkey";
						columns: ["project_id"];
						isOneToOne: false;
						referencedRelation: "Projects";
						referencedColumns: ["project_id"];
					},
				];
			};
			Projects: {
				Row: {
					achievements: string | null;
					attachment_url: string | null;
					competitors: string | null;
					created_at: string;
					market_size: string | null;
					problem_statement: string | null;
					project_id: string;
					project_name: string | null;
					revenue_model: string | null;
					solution: string | null;
					stage_of_development: string | null;
					tagline: string | null;
					target_audience: string | null;
					team: string | null;
					updated_at: string | null;
					user_id: string | null;
					uvp: string | null;
				};
				Insert: {
					achievements?: string | null;
					attachment_url?: string | null;
					competitors?: string | null;
					created_at?: string;
					market_size?: string | null;
					problem_statement?: string | null;
					project_id?: string;
					project_name?: string | null;
					revenue_model?: string | null;
					solution?: string | null;
					stage_of_development?: string | null;
					tagline?: string | null;
					target_audience?: string | null;
					team?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
					uvp?: string | null;
				};
				Update: {
					achievements?: string | null;
					attachment_url?: string | null;
					competitors?: string | null;
					created_at?: string;
					market_size?: string | null;
					problem_statement?: string | null;
					project_id?: string;
					project_name?: string | null;
					revenue_model?: string | null;
					solution?: string | null;
					stage_of_development?: string | null;
					tagline?: string | null;
					target_audience?: string | null;
					team?: string | null;
					updated_at?: string | null;
					user_id?: string | null;
					uvp?: string | null;
				};
				Relationships: [];
			};
			Test_table: {
				Row: {
					created_at: string;
					id: number;
					Test: string | null;
				};
				Insert: {
					created_at?: string;
					id?: number;
					Test?: string | null;
				};
				Update: {
					created_at?: string;
					id?: number;
					Test?: string | null;
				};
				Relationships: [];
			};
			User_Profile: {
				Row: {
					about_me: string | null;
					Address: string | null;
					age: number | null;
					avatar_url: string | null;
					bio: string | null;
					DOB: string | null;
					Gender: string | null;
					job_title: string | null;
					linkedin_url: string | null;
					Place_of_work: string | null;
					user_id: string;
					username: string | null;
				};
				Insert: {
					about_me?: string | null;
					Address?: string | null;
					age?: number | null;
					avatar_url?: string | null;
					bio?: string | null;
					DOB?: string | null;
					Gender?: string | null;
					job_title?: string | null;
					linkedin_url?: string | null;
					Place_of_work?: string | null;
					user_id?: string;
					username?: string | null;
				};
				Update: {
					about_me?: string | null;
					Address?: string | null;
					age?: number | null;
					avatar_url?: string | null;
					bio?: string | null;
					DOB?: string | null;
					Gender?: string | null;
					job_title?: string | null;
					linkedin_url?: string | null;
					Place_of_work?: string | null;
					user_id?: string;
					username?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			update_user_ages: {
				Args: Record<PropertyKey, never>;
				Returns: undefined;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;
