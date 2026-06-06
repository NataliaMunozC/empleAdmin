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
      aportes_seguridad_social: {
        Row: {
          anio: number
          arl: number
          caja_compensacion: number
          contrato_id: string
          created_at: string
          empleador_id: string
          estado_pago: Database["public"]["Enums"]["estado_pago_enum"]
          fecha_pago: string | null
          ibc: number
          id: string
          mes: number
          nomina_id: string | null
          pension_empleado: number
          pension_empleador: number
          salud_empleado: number
          salud_empleador: number
          total: number
          updated_at: string
        }
        Insert: {
          anio: number
          arl?: number
          caja_compensacion?: number
          contrato_id: string
          created_at?: string
          empleador_id: string
          estado_pago?: Database["public"]["Enums"]["estado_pago_enum"]
          fecha_pago?: string | null
          ibc?: number
          id?: string
          mes: number
          nomina_id?: string | null
          pension_empleado?: number
          pension_empleador?: number
          salud_empleado?: number
          salud_empleador?: number
          total?: number
          updated_at?: string
        }
        Update: {
          anio?: number
          arl?: number
          caja_compensacion?: number
          contrato_id?: string
          created_at?: string
          empleador_id?: string
          estado_pago?: Database["public"]["Enums"]["estado_pago_enum"]
          fecha_pago?: string | null
          ibc?: number
          id?: string
          mes?: number
          nomina_id?: string | null
          pension_empleado?: number
          pension_empleador?: number
          salud_empleado?: number
          salud_empleador?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aportes_seguridad_social_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aportes_seguridad_social_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aportes_seguridad_social_nomina_id_fkey"
            columns: ["nomina_id"]
            isOneToOne: false
            referencedRelation: "nominas"
            referencedColumns: ["id"]
          },
        ]
      }
      contratos: {
        Row: {
          aplica_arl: boolean
          aplica_auxilio_transporte: boolean
          aplica_caja: boolean
          aplica_pension: boolean
          aplica_salud: boolean
          clase_riesgo_arl: number | null
          created_at: string
          dias_por_semana: number | null
          documento_contrato_id: string | null
          empleado_id: string
          empleador_id: string
          estado: Database["public"]["Enums"]["estado_contrato_enum"]
          fecha_fin: string | null
          fecha_inicio: string
          id: string
          modalidad: Database["public"]["Enums"]["modalidad_contrato_enum"]
          salario_mensual: number | null
          tipo_duracion: Database["public"]["Enums"]["tipo_duracion_enum"]
          updated_at: string
          valor_dia: number | null
        }
        Insert: {
          aplica_arl?: boolean
          aplica_auxilio_transporte?: boolean
          aplica_caja?: boolean
          aplica_pension?: boolean
          aplica_salud?: boolean
          clase_riesgo_arl?: number | null
          created_at?: string
          dias_por_semana?: number | null
          documento_contrato_id?: string | null
          empleado_id: string
          empleador_id: string
          estado?: Database["public"]["Enums"]["estado_contrato_enum"]
          fecha_fin?: string | null
          fecha_inicio: string
          id?: string
          modalidad: Database["public"]["Enums"]["modalidad_contrato_enum"]
          salario_mensual?: number | null
          tipo_duracion: Database["public"]["Enums"]["tipo_duracion_enum"]
          updated_at?: string
          valor_dia?: number | null
        }
        Update: {
          aplica_arl?: boolean
          aplica_auxilio_transporte?: boolean
          aplica_caja?: boolean
          aplica_pension?: boolean
          aplica_salud?: boolean
          clase_riesgo_arl?: number | null
          created_at?: string
          dias_por_semana?: number | null
          documento_contrato_id?: string | null
          empleado_id?: string
          empleador_id?: string
          estado?: Database["public"]["Enums"]["estado_contrato_enum"]
          fecha_fin?: string | null
          fecha_inicio?: string
          id?: string
          modalidad?: Database["public"]["Enums"]["modalidad_contrato_enum"]
          salario_mensual?: number | null
          tipo_duracion?: Database["public"]["Enums"]["tipo_duracion_enum"]
          updated_at?: string
          valor_dia?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contratos_clase_riesgo_arl_fkey"
            columns: ["clase_riesgo_arl"]
            isOneToOne: false
            referencedRelation: "tarifas_arl"
            referencedColumns: ["clase_riesgo"]
          },
          {
            foreignKeyName: "contratos_documento_contrato_id_fkey"
            columns: ["documento_contrato_id"]
            isOneToOne: false
            referencedRelation: "documentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos: {
        Row: {
          contrato_id: string | null
          created_at: string
          empleado_id: string | null
          empleador_id: string
          firmado_ambas_partes: boolean
          id: string
          mime_type: string | null
          nombre: string
          storage_path: string
          tamano_bytes: number | null
          tipo: Database["public"]["Enums"]["tipo_documento_archivo_enum"]
          updated_at: string
        }
        Insert: {
          contrato_id?: string | null
          created_at?: string
          empleado_id?: string | null
          empleador_id: string
          firmado_ambas_partes?: boolean
          id?: string
          mime_type?: string | null
          nombre: string
          storage_path: string
          tamano_bytes?: number | null
          tipo: Database["public"]["Enums"]["tipo_documento_archivo_enum"]
          updated_at?: string
        }
        Update: {
          contrato_id?: string | null
          created_at?: string
          empleado_id?: string | null
          empleador_id?: string
          firmado_ambas_partes?: boolean
          id?: string
          mime_type?: string | null
          nombre?: string
          storage_path?: string
          tamano_bytes?: number | null
          tipo?: Database["public"]["Enums"]["tipo_documento_archivo_enum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentos_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
        ]
      }
      empleadores: {
        Row: {
          created_at: string
          email: string | null
          id: string
          nombre_completo: string | null
          numero_documento: string | null
          telefono: string | null
          tipo_documento:
            | Database["public"]["Enums"]["tipo_documento_enum"]
            | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          nombre_completo?: string | null
          numero_documento?: string | null
          telefono?: string | null
          tipo_documento?:
            | Database["public"]["Enums"]["tipo_documento_enum"]
            | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          nombre_completo?: string | null
          numero_documento?: string | null
          telefono?: string | null
          tipo_documento?:
            | Database["public"]["Enums"]["tipo_documento_enum"]
            | null
          updated_at?: string
        }
        Relationships: []
      }
      empleados: {
        Row: {
          activo: boolean
          afp: string | null
          caja_compensacion: string | null
          created_at: string
          direccion: string | null
          email: string | null
          empleador_id: string
          eps: string | null
          fecha_nacimiento: string | null
          genero: Database["public"]["Enums"]["genero_enum"] | null
          id: string
          numero_documento: string
          primer_apellido: string
          primer_nombre: string
          segundo_apellido: string | null
          segundo_nombre: string | null
          telefono: string | null
          tipo_documento: Database["public"]["Enums"]["tipo_documento_enum"]
          updated_at: string
        }
        Insert: {
          activo?: boolean
          afp?: string | null
          caja_compensacion?: string | null
          created_at?: string
          direccion?: string | null
          email?: string | null
          empleador_id: string
          eps?: string | null
          fecha_nacimiento?: string | null
          genero?: Database["public"]["Enums"]["genero_enum"] | null
          id?: string
          numero_documento: string
          primer_apellido: string
          primer_nombre: string
          segundo_apellido?: string | null
          segundo_nombre?: string | null
          telefono?: string | null
          tipo_documento: Database["public"]["Enums"]["tipo_documento_enum"]
          updated_at?: string
        }
        Update: {
          activo?: boolean
          afp?: string | null
          caja_compensacion?: string | null
          created_at?: string
          direccion?: string | null
          email?: string | null
          empleador_id?: string
          eps?: string | null
          fecha_nacimiento?: string | null
          genero?: Database["public"]["Enums"]["genero_enum"] | null
          id?: string
          numero_documento?: string
          primer_apellido?: string
          primer_nombre?: string
          segundo_apellido?: string | null
          segundo_nombre?: string | null
          telefono?: string | null
          tipo_documento?: Database["public"]["Enums"]["tipo_documento_enum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "empleados_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
        ]
      }
      movimientos_vacaciones: {
        Row: {
          contrato_id: string
          created_at: string
          descripcion: string | null
          dias: number
          empleador_id: string
          fecha_fin: string | null
          fecha_inicio: string | null
          id: string
          tipo: Database["public"]["Enums"]["tipo_movimiento_vacaciones_enum"]
        }
        Insert: {
          contrato_id: string
          created_at?: string
          descripcion?: string | null
          dias?: number
          empleador_id: string
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          tipo: Database["public"]["Enums"]["tipo_movimiento_vacaciones_enum"]
        }
        Update: {
          contrato_id?: string
          created_at?: string
          descripcion?: string | null
          dias?: number
          empleador_id?: string
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: string
          tipo?: Database["public"]["Enums"]["tipo_movimiento_vacaciones_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "movimientos_vacaciones_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimientos_vacaciones_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
        ]
      }
      nomina_conceptos: {
        Row: {
          concepto: Database["public"]["Enums"]["concepto_nomina_enum"]
          created_at: string
          empleador_id: string
          id: string
          naturaleza: Database["public"]["Enums"]["naturaleza_concepto_enum"]
          nomina_id: string
          valor: number
        }
        Insert: {
          concepto: Database["public"]["Enums"]["concepto_nomina_enum"]
          created_at?: string
          empleador_id: string
          id?: string
          naturaleza: Database["public"]["Enums"]["naturaleza_concepto_enum"]
          nomina_id: string
          valor?: number
        }
        Update: {
          concepto?: Database["public"]["Enums"]["concepto_nomina_enum"]
          created_at?: string
          empleador_id?: string
          id?: string
          naturaleza?: Database["public"]["Enums"]["naturaleza_concepto_enum"]
          nomina_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "nomina_conceptos_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nomina_conceptos_nomina_id_fkey"
            columns: ["nomina_id"]
            isOneToOne: false
            referencedRelation: "nominas"
            referencedColumns: ["id"]
          },
        ]
      }
      nominas: {
        Row: {
          anio: number
          contrato_id: string
          created_at: string
          desprendible_documento_id: string | null
          dias_laborados: number
          empleador_id: string
          estado: Database["public"]["Enums"]["estado_nomina_enum"]
          id: string
          mes: number
          neto_pagado: number
          total_deducciones: number
          total_devengado: number
          updated_at: string
        }
        Insert: {
          anio: number
          contrato_id: string
          created_at?: string
          desprendible_documento_id?: string | null
          dias_laborados?: number
          empleador_id: string
          estado?: Database["public"]["Enums"]["estado_nomina_enum"]
          id?: string
          mes: number
          neto_pagado?: number
          total_deducciones?: number
          total_devengado?: number
          updated_at?: string
        }
        Update: {
          anio?: number
          contrato_id?: string
          created_at?: string
          desprendible_documento_id?: string | null
          dias_laborados?: number
          empleador_id?: string
          estado?: Database["public"]["Enums"]["estado_nomina_enum"]
          id?: string
          mes?: number
          neto_pagado?: number
          total_deducciones?: number
          total_devengado?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nominas_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nominas_desprendible_documento_id_fkey"
            columns: ["desprendible_documento_id"]
            isOneToOne: false
            referencedRelation: "documentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nominas_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
        ]
      }
      novedades: {
        Row: {
          created_at: string
          descripcion: string | null
          dias: number
          empleador_id: string
          fecha: string
          id: string
          periodo_laboral_id: string
          tipo: Database["public"]["Enums"]["tipo_novedad_enum"]
        }
        Insert: {
          created_at?: string
          descripcion?: string | null
          dias?: number
          empleador_id: string
          fecha: string
          id?: string
          periodo_laboral_id: string
          tipo: Database["public"]["Enums"]["tipo_novedad_enum"]
        }
        Update: {
          created_at?: string
          descripcion?: string | null
          dias?: number
          empleador_id?: string
          fecha?: string
          id?: string
          periodo_laboral_id?: string
          tipo?: Database["public"]["Enums"]["tipo_novedad_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "novedades_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "novedades_periodo_laboral_id_fkey"
            columns: ["periodo_laboral_id"]
            isOneToOne: false
            referencedRelation: "periodos_laborales"
            referencedColumns: ["id"]
          },
        ]
      }
      parametros_legales: {
        Row: {
          anio: number
          auxilio_transporte: number
          created_at: string
          dias_vacaciones_anuales: number
          id: string
          pct_caja: number
          pct_intereses_cesantias: number
          pct_pension_empleado: number
          pct_pension_empleador: number
          pct_salud_empleado: number
          pct_salud_empleador: number
          smmlv: number
          updated_at: string
        }
        Insert: {
          anio: number
          auxilio_transporte?: number
          created_at?: string
          dias_vacaciones_anuales?: number
          id?: string
          pct_caja: number
          pct_intereses_cesantias?: number
          pct_pension_empleado: number
          pct_pension_empleador: number
          pct_salud_empleado: number
          pct_salud_empleador: number
          smmlv: number
          updated_at?: string
        }
        Update: {
          anio?: number
          auxilio_transporte?: number
          created_at?: string
          dias_vacaciones_anuales?: number
          id?: string
          pct_caja?: number
          pct_intereses_cesantias?: number
          pct_pension_empleado?: number
          pct_pension_empleador?: number
          pct_salud_empleado?: number
          pct_salud_empleador?: number
          smmlv?: number
          updated_at?: string
        }
        Relationships: []
      }
      periodos_laborales: {
        Row: {
          anio: number
          contrato_id: string
          created_at: string
          dias_efectivos: number
          dias_estimados: number
          empleador_id: string
          id: string
          mes: number
          notas: string | null
          updated_at: string
        }
        Insert: {
          anio: number
          contrato_id: string
          created_at?: string
          dias_efectivos?: number
          dias_estimados?: number
          empleador_id: string
          id?: string
          mes: number
          notas?: string | null
          updated_at?: string
        }
        Update: {
          anio?: number
          contrato_id?: string
          created_at?: string
          dias_efectivos?: number
          dias_estimados?: number
          empleador_id?: string
          id?: string
          mes?: number
          notas?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "periodos_laborales_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "periodos_laborales_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
        ]
      }
      prestaciones_sociales: {
        Row: {
          contrato_id: string
          created_at: string
          dias_base: number
          documento_id: string | null
          empleador_id: string
          estado: Database["public"]["Enums"]["estado_prestacion_enum"]
          fecha_pago: string | null
          id: string
          periodo_fin: string
          periodo_inicio: string
          salario_base: number
          tipo: Database["public"]["Enums"]["tipo_prestacion_enum"]
          updated_at: string
          valor_calculado: number
          valor_pagado: number
        }
        Insert: {
          contrato_id: string
          created_at?: string
          dias_base?: number
          documento_id?: string | null
          empleador_id: string
          estado?: Database["public"]["Enums"]["estado_prestacion_enum"]
          fecha_pago?: string | null
          id?: string
          periodo_fin: string
          periodo_inicio: string
          salario_base?: number
          tipo: Database["public"]["Enums"]["tipo_prestacion_enum"]
          updated_at?: string
          valor_calculado?: number
          valor_pagado?: number
        }
        Update: {
          contrato_id?: string
          created_at?: string
          dias_base?: number
          documento_id?: string | null
          empleador_id?: string
          estado?: Database["public"]["Enums"]["estado_prestacion_enum"]
          fecha_pago?: string | null
          id?: string
          periodo_fin?: string
          periodo_inicio?: string
          salario_base?: number
          tipo?: Database["public"]["Enums"]["tipo_prestacion_enum"]
          updated_at?: string
          valor_calculado?: number
          valor_pagado?: number
        }
        Relationships: [
          {
            foreignKeyName: "prestaciones_sociales_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prestaciones_sociales_documento_id_fkey"
            columns: ["documento_id"]
            isOneToOne: false
            referencedRelation: "documentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prestaciones_sociales_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
        ]
      }
      tarifas_arl: {
        Row: {
          clase_riesgo: number
          descripcion: string | null
          porcentaje: number
        }
        Insert: {
          clase_riesgo: number
          descripcion?: string | null
          porcentaje: number
        }
        Update: {
          clase_riesgo?: number
          descripcion?: string | null
          porcentaje?: number
        }
        Relationships: []
      }
    }
    Views: {
      saldo_vacaciones: {
        Row: {
          contrato_id: string | null
          empleador_id: string | null
          saldo_dias: number | null
        }
        Relationships: [
          {
            foreignKeyName: "movimientos_vacaciones_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimientos_vacaciones_empleador_id_fkey"
            columns: ["empleador_id"]
            isOneToOne: false
            referencedRelation: "empleadores"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      concepto_nomina_enum:
        | "salario"
        | "auxilio_transporte"
        | "salud_empleado"
        | "pension_empleado"
        | "otro"
      estado_contrato_enum: "activo" | "suspendido" | "terminado"
      estado_nomina_enum: "borrador" | "generada" | "pagada" | "firmada"
      estado_pago_enum: "pendiente" | "pagado"
      estado_prestacion_enum:
        | "pendiente"
        | "liquidada"
        | "pagada"
        | "consignada"
      genero_enum: "masculino" | "femenino" | "otro"
      modalidad_contrato_enum: "tiempo_completo" | "por_dias"
      naturaleza_concepto_enum: "devengado" | "deduccion"
      tipo_documento_archivo_enum:
        | "contrato_firmado"
        | "desprendible_nomina"
        | "soporte_prestacion"
        | "documento_identidad"
        | "otro"
      tipo_documento_enum: "CC" | "CE" | "PEP" | "PPT" | "PASAPORTE" | "TI"
      tipo_duracion_enum: "indefinido" | "termino_fijo" | "obra_labor"
      tipo_movimiento_vacaciones_enum:
        | "causado"
        | "tomado"
        | "pagado"
        | "ajuste"
      tipo_novedad_enum:
        | "ausencia"
        | "incapacidad"
        | "licencia"
        | "dia_adicional"
        | "vacaciones"
        | "otro"
      tipo_prestacion_enum:
        | "prima_servicios"
        | "cesantias"
        | "intereses_cesantias"
        | "vacaciones"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      concepto_nomina_enum: [
        "salario",
        "auxilio_transporte",
        "salud_empleado",
        "pension_empleado",
        "otro",
      ],
      estado_contrato_enum: ["activo", "suspendido", "terminado"],
      estado_nomina_enum: ["borrador", "generada", "pagada", "firmada"],
      estado_pago_enum: ["pendiente", "pagado"],
      estado_prestacion_enum: [
        "pendiente",
        "liquidada",
        "pagada",
        "consignada",
      ],
      genero_enum: ["masculino", "femenino", "otro"],
      modalidad_contrato_enum: ["tiempo_completo", "por_dias"],
      naturaleza_concepto_enum: ["devengado", "deduccion"],
      tipo_documento_archivo_enum: [
        "contrato_firmado",
        "desprendible_nomina",
        "soporte_prestacion",
        "documento_identidad",
        "otro",
      ],
      tipo_documento_enum: ["CC", "CE", "PEP", "PPT", "PASAPORTE", "TI"],
      tipo_duracion_enum: ["indefinido", "termino_fijo", "obra_labor"],
      tipo_movimiento_vacaciones_enum: [
        "causado",
        "tomado",
        "pagado",
        "ajuste",
      ],
      tipo_novedad_enum: [
        "ausencia",
        "incapacidad",
        "licencia",
        "dia_adicional",
        "vacaciones",
        "otro",
      ],
      tipo_prestacion_enum: [
        "prima_servicios",
        "cesantias",
        "intereses_cesantias",
        "vacaciones",
      ],
    },
  },
} as const

