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

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
