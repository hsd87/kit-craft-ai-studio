export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      kit_designs: {
        Row: {
          back_image_url: string | null
          club_name: string
          collar_style: string
          created_at: string
          custom_pattern: string | null
          delivery_region: string | null
          design_style: string
          express_prod: boolean
          fabric_type: string
          fourth_color: string | null
          front_image_url: string | null
          id: string
          kit_type: string[]
          making_type: string
          primary_color: string
          quantity: number
          region: string | null
          secondary_color: string
          sleeve_pattern: string
          team_logo_url: string | null
          third_color: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          back_image_url?: string | null
          club_name: string
          collar_style: string
          created_at?: string
          custom_pattern?: string | null
          delivery_region?: string | null
          design_style: string
          express_prod?: boolean
          fabric_type: string
          fourth_color?: string | null
          front_image_url?: string | null
          id?: string
          kit_type: string[]
          making_type: string
          primary_color: string
          quantity?: number
          region?: string | null
          secondary_color: string
          sleeve_pattern: string
          team_logo_url?: string | null
          third_color?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          back_image_url?: string | null
          club_name?: string
          collar_style?: string
          created_at?: string
          custom_pattern?: string | null
          delivery_region?: string | null
          design_style?: string
          express_prod?: boolean
          fabric_type?: string
          fourth_color?: string | null
          front_image_url?: string | null
          id?: string
          kit_type?: string[]
          making_type?: string
          primary_color?: string
          quantity?: number
          region?: string | null
          secondary_color?: string
          sleeve_pattern?: string
          team_logo_url?: string | null
          third_color?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          id: string
          kit_design_id: string | null
          payment_id: string | null
          shipping_address: Json | null
          status: string
          total_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kit_design_id?: string | null
          payment_id?: string | null
          shipping_address?: Json | null
          status?: string
          total_price: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kit_design_id?: string | null
          payment_id?: string | null
          shipping_address?: Json | null
          status?: string
          total_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_kit_design_id_fkey"
            columns: ["kit_design_id"]
            isOneToOne: false
            referencedRelation: "kit_designs"
            referencedColumns: ["id"]
          },
        ]
      }
      player_details: {
        Row: {
          created_at: string
          id: string
          kit_design_id: string | null
          player_name: string
          player_number: string
        }
        Insert: {
          created_at?: string
          id?: string
          kit_design_id?: string | null
          player_name: string
          player_number: string
        }
        Update: {
          created_at?: string
          id?: string
          kit_design_id?: string | null
          player_name?: string
          player_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_details_kit_design_id_fkey"
            columns: ["kit_design_id"]
            isOneToOne: false
            referencedRelation: "kit_designs"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsor_logos: {
        Row: {
          created_at: string
          id: string
          kit_design_id: string | null
          logo_url: string
          placement: string
          sponsor_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kit_design_id?: string | null
          logo_url: string
          placement: string
          sponsor_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kit_design_id?: string | null
          logo_url?: string
          placement?: string
          sponsor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsor_logos_kit_design_id_fkey"
            columns: ["kit_design_id"]
            isOneToOne: false
            referencedRelation: "kit_designs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
