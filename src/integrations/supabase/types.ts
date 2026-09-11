export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      assessment_questions: {
        Row: {
          choices: Json;
          correct_choice_id: string;
          course_id: string | null;
          hint: Json | null;
          id: string;
          is_reserve: boolean;
          kind: string;
          lesson_id: string | null;
          order_index: number;
          prompt: Json;
          unit_id: string | null;
        };
        Insert: {
          choices: Json;
          correct_choice_id: string;
          course_id?: string | null;
          hint?: Json | null;
          id?: string;
          is_reserve?: boolean;
          kind: string;
          lesson_id?: string | null;
          order_index: number;
          prompt: Json;
          unit_id?: string | null;
        };
        Update: {
          choices?: Json;
          correct_choice_id?: string;
          course_id?: string | null;
          hint?: Json | null;
          id?: string;
          is_reserve?: boolean;
          kind?: string;
          lesson_id?: string | null;
          order_index?: number;
          prompt?: Json;
          unit_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "assessment_questions_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "assessment_questions_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "assessment_questions_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "units";
            referencedColumns: ["id"];
          },
        ];
      };
      attack_planner_usage: {
        Row: {
          plan_count: number;
          usage_date: string;
          user_id: string;
        };
        Insert: {
          plan_count?: number;
          usage_date?: string;
          user_id: string;
        };
        Update: {
          plan_count?: number;
          usage_date?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      certificates: {
        Row: {
          course_id: string | null;
          id: string;
          issued_at: string;
          learning_summary: string | null;
          recipient_name: string;
          score: number;
          topic_slug: string | null;
          user_id: string;
        };
        Insert: {
          course_id?: string | null;
          id?: string;
          issued_at?: string;
          learning_summary?: string | null;
          recipient_name: string;
          score: number;
          topic_slug?: string | null;
          user_id: string;
        };
        Update: {
          course_id?: string | null;
          id?: string;
          issued_at?: string;
          learning_summary?: string | null;
          recipient_name?: string;
          score?: number;
          topic_slug?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_usage: {
        Row: {
          message_count: number;
          usage_date: string;
          user_id: string;
        };
        Insert: {
          message_count?: number;
          usage_date?: string;
          user_id: string;
        };
        Update: {
          message_count?: number;
          usage_date?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      course_check_usage: {
        Row: {
          check_count: number;
          usage_date: string;
          user_id: string;
        };
        Insert: {
          check_count?: number;
          usage_date?: string;
          user_id: string;
        };
        Update: {
          check_count?: number;
          usage_date?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      course_exam_attempts: {
        Row: {
          course_id: string;
          created_at: string;
          id: string;
          kind: string;
          passed: boolean;
          percentage: number;
          score: number;
          total: number;
          unit_id: string | null;
          user_id: string;
        };
        Insert: {
          course_id: string;
          created_at?: string;
          id?: string;
          kind: string;
          passed: boolean;
          percentage: number;
          score: number;
          total: number;
          unit_id?: string | null;
          user_id: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          id?: string;
          kind?: string;
          passed?: boolean;
          percentage?: number;
          score?: number;
          total?: number;
          unit_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_exam_attempts_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "course_exam_attempts_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "units";
            referencedColumns: ["id"];
          },
        ];
      };
      course_progress: {
        Row: {
          course_id: string;
          last_lesson_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          course_id: string;
          last_lesson_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          course_id?: string;
          last_lesson_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_progress_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "course_progress_last_lesson_id_fkey";
            columns: ["last_lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
        ];
      };
      courses: {
        Row: {
          created_at: string;
          id: string;
          learning_summary: Json | null;
          order_index: number;
          published: boolean;
          slug: string;
          title: Json;
          topic_slug: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          learning_summary?: Json | null;
          order_index: number;
          published?: boolean;
          slug: string;
          title: Json;
          topic_slug?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          learning_summary?: Json | null;
          order_index?: number;
          published?: boolean;
          slug?: string;
          title?: Json;
          topic_slug?: string | null;
        };
        Relationships: [];
      };
      lessons: {
        Row: {
          body: Json;
          id: string;
          order_index: number;
          title: Json;
          unit_id: string;
        };
        Insert: {
          body: Json;
          id?: string;
          order_index: number;
          title: Json;
          unit_id: string;
        };
        Update: {
          body?: Json;
          id?: string;
          order_index?: number;
          title?: Json;
          unit_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lessons_unit_id_fkey";
            columns: ["unit_id"];
            isOneToOne: false;
            referencedRelation: "units";
            referencedColumns: ["id"];
          },
        ];
      };
      link_check_usage: {
        Row: {
          check_count: number;
          usage_date: string;
          user_id: string;
        };
        Insert: {
          check_count?: number;
          usage_date?: string;
          user_id: string;
        };
        Update: {
          check_count?: number;
          usage_date?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          email: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          email?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          email?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      quiz_attempts: {
        Row: {
          created_at: string;
          id: string;
          passed: boolean;
          percentage: number;
          score: number;
          topic_slug: string;
          total: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          passed: boolean;
          percentage: number;
          score: number;
          topic_slug: string;
          total: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          passed?: boolean;
          percentage?: number;
          score?: number;
          topic_slug?: string;
          total?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      quiz_check_usage: {
        Row: {
          check_count: number;
          usage_date: string;
          user_id: string;
        };
        Insert: {
          check_count?: number;
          usage_date?: string;
          user_id: string;
        };
        Update: {
          check_count?: number;
          usage_date?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      tts_usage: {
        Row: {
          request_count: number;
          usage_date: string;
          user_id: string;
        };
        Insert: {
          request_count?: number;
          usage_date?: string;
          user_id: string;
        };
        Update: {
          request_count?: number;
          usage_date?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      units: {
        Row: {
          course_id: string;
          id: string;
          order_index: number;
          title: Json;
        };
        Insert: {
          course_id: string;
          id?: string;
          order_index: number;
          title: Json;
        };
        Update: {
          course_id?: string;
          id?: string;
          order_index?: number;
          title?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "units_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_and_increment_attack_planner_usage: {
        Args: { p_daily_limit: number; p_user_id: string };
        Returns: boolean;
      };
      check_and_increment_chat_usage: {
        Args: { p_daily_limit: number; p_user_id: string };
        Returns: boolean;
      };
      check_and_increment_course_check_usage: {
        Args: { p_daily_limit: number; p_user_id: string };
        Returns: boolean;
      };
      check_and_increment_link_check_usage: {
        Args: { p_daily_limit: number; p_user_id: string };
        Returns: boolean;
      };
      check_and_increment_quiz_check_usage: {
        Args: { p_daily_limit: number; p_user_id: string };
        Returns: boolean;
      };
      check_and_increment_tts_usage: {
        Args: { p_daily_limit: number; p_user_id: string };
        Returns: boolean;
      };
      get_certificate_for_verification: {
        Args: { p_cert_id: string };
        Returns: {
          course_slug: string;
          course_title: Json;
          issued_at: string;
          learning_summary: string;
          recipient_name: string;
          score: number;
          topic_slug: string;
        }[];
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

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
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
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
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
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
    Enums: {},
  },
} as const;
