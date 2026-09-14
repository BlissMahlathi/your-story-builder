export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      documents: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          file_url: string;
          id: string;
          sort_order: number;
          status: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at: string;
        };
        Insert: {
          category?: string;
          created_at?: string;
          description?: string;
          file_url: string;
          id?: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          file_url?: string;
          id?: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      enquiries: {
        Row: {
          attachment_url: string | null;
          budget: string;
          company_name: string;
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          internal_notes: string;
          location: string;
          message: string;
          phone: string;
          quantity: string;
          service_requested: string;
          status: Database["public"]["Enums"]["enquiry_status"];
          subject: string;
          timeline: string;
          type: Database["public"]["Enums"]["enquiry_type"];
          updated_at: string;
        };
        Insert: {
          attachment_url?: string | null;
          budget?: string;
          company_name?: string;
          created_at?: string;
          email: string;
          full_name: string;
          id?: string;
          internal_notes?: string;
          location?: string;
          message: string;
          phone: string;
          quantity?: string;
          service_requested?: string;
          status?: Database["public"]["Enums"]["enquiry_status"];
          subject?: string;
          timeline?: string;
          type: Database["public"]["Enums"]["enquiry_type"];
          updated_at?: string;
        };
        Update: {
          attachment_url?: string | null;
          budget?: string;
          company_name?: string;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          internal_notes?: string;
          location?: string;
          message?: string;
          phone?: string;
          quantity?: string;
          service_requested?: string;
          status?: Database["public"]["Enums"]["enquiry_status"];
          subject?: string;
          timeline?: string;
          type?: Database["public"]["Enums"]["enquiry_type"];
          updated_at?: string;
        };
        Relationships: [];
      };
      gallery_items: {
        Row: {
          alt_text: string;
          category: string;
          created_at: string;
          description: string;
          id: string;
          image_url: string;
          project_date: string | null;
          sort_order: number;
          status: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at: string;
        };
        Insert: {
          alt_text: string;
          category?: string;
          created_at?: string;
          description?: string;
          id?: string;
          image_url: string;
          project_date?: string | null;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at?: string;
        };
        Update: {
          alt_text?: string;
          category?: string;
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string;
          project_date?: string | null;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          author_name: string;
          body: string;
          category: string;
          cover_url: string | null;
          created_at: string;
          excerpt: string;
          id: string;
          published_at: string | null;
          slug: string;
          status: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at: string;
        };
        Insert: {
          author_name?: string;
          body?: string;
          category?: string;
          cover_url?: string | null;
          created_at?: string;
          excerpt?: string;
          id?: string;
          published_at?: string | null;
          slug: string;
          status?: Database["public"]["Enums"]["content_status"];
          title: string;
          updated_at?: string;
        };
        Update: {
          author_name?: string;
          body?: string;
          category?: string;
          cover_url?: string | null;
          created_at?: string;
          excerpt?: string;
          id?: string;
          published_at?: string | null;
          slug?: string;
          status?: Database["public"]["Enums"]["content_status"];
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      service_divisions: {
        Row: {
          created_at: string;
          icon: string;
          id: string;
          name: string;
          slug: string;
          sort_order: number;
          status: Database["public"]["Enums"]["content_status"];
          summary: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          icon?: string;
          id?: string;
          name: string;
          slug: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          summary?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          icon?: string;
          id?: string;
          name?: string;
          slug?: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          summary?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          capabilities: Json;
          created_at: string;
          description: string;
          division_id: string;
          id: string;
          name: string;
          slug: string;
          sort_order: number;
          status: Database["public"]["Enums"]["content_status"];
          updated_at: string;
        };
        Insert: {
          capabilities?: Json;
          created_at?: string;
          description?: string;
          division_id: string;
          id?: string;
          name: string;
          slug: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Update: {
          capabilities?: Json;
          created_at?: string;
          description?: string;
          division_id?: string;
          id?: string;
          name?: string;
          slug?: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "services_division_id_fkey";
            columns: ["division_id"];
            isOneToOne: false;
            referencedRelation: "service_divisions";
            referencedColumns: ["id"];
          },
        ];
      };
      site_settings: {
        Row: {
          is_public: boolean;
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          is_public?: boolean;
          key: string;
          updated_at?: string;
          value?: Json;
        };
        Update: {
          is_public?: boolean;
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      claim_first_admin: { Args: never; Returns: boolean };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "editor";
      content_status: "draft" | "published" | "archived";
      enquiry_status: "new" | "in_progress" | "responded" | "closed";
      enquiry_type: "contact" | "quote";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
      content_status: ["draft", "published", "archived"],
      enquiry_status: ["new", "in_progress", "responded", "closed"],
      enquiry_type: ["contact", "quote"],
    },
  },
} as const;
