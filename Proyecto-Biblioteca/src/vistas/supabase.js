import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yjfoaffxyijnrvsggdgr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZm9hZmZ4eWlqbnJ2c2dnZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwMDMzMDMsImV4cCI6MTk5MjU3OTMwM30.ZFxjegJ8rzQQKrKu091gEC5LuvnH2fBlMKg40Nkd6EA'

// exportamos la conexión
export const supabase = createClient(supabaseUrl, supabaseKey)
