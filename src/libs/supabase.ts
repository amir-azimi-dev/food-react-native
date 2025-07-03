import { Database } from '@/supabaseTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dnwiaunopkmcimrfldpz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRud2lhdW5vcGttY2ltcmZsZHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyODYzMzAsImV4cCI6MjA2Njg2MjMzMH0.FJkNRO8TfE9ouZiw1bY7dlb2k7N1UAefh_Xdi_w0_HU"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})