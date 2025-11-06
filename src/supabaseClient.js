import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zettghhdzaezjgyrfvuy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpldHRnaGhkemFlempneXJmdnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjUzMTAsImV4cCI6MjA3Nzg0MTMxMH0.dS-BnS1nrvkYZhirfMK2E2zKJTa3ERur1ZaC7WPYX3k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
