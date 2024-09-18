import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://vfodrjehlabzhhykxkwk.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmb2RyamVobGFiemhoeWt4a3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1MzE5MjMsImV4cCI6MjA0MTEwNzkyM30.dXSXi6HPV-zqFORXSL8_YueBqy6BkGmvk-CPcMjJQ7Y'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase
