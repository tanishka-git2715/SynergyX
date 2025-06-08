import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gxlehqitpionreybioqd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4bGVocWl0cGlvbnJleWJpb3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzODk5MDgsImV4cCI6MjA2NDk2NTkwOH0.LUT8gdRbv0EwpxKN9iSzsdPhWoqKdhQY2X8aIN2vitM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);