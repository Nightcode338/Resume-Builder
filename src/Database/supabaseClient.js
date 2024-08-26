import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gjxeqwfnrrcmpuahpknb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqeGVxd2ZucnJjbXB1YWhwa25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDQ3NzIsImV4cCI6MjAzNTQ4MDc3Mn0.IP-UffEMTuR-AEt7RPHI1_TNzo20Mhzd_g5vo09-2f4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)