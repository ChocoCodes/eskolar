import { SupabaseClient, QueryData } from '@supabase/supabase-js';

export const getStudentProfileQuery = (supabase: SupabaseClient, userId: string) => {
    return supabase
        .from('profiles')
        .select(`
            full_name,
            city,
            region,
            bio,
            gwa,
            highest_degree,
            date_of_birth,
            annual_family_income,
            special_group,
            profile_items(
                title,
                description,
                issuer,
                organization,
                category,
                duration
            )
        `)
        .eq('user_id', userId)
        .single();
}

export type StudentProfile = QueryData<typeof getStudentProfileQuery>;