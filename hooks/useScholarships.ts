import { useState, useEffect } from 'react';
import { useSupabaseAuthUser, useSupabaseClient } from './useSupabase';

export interface Scholarship {
    id: number;
    provider_name: string;
    program_name: string;
    award_value: number;
    status: string;
    grant_type: string;
    deadline: string;
    cutoff_grade: number;
    program_img_url: string;
    description: string;
    eligibility: string;
    slots: number;
    annual_family_income: number | null;
    tags: string[];
}

export const useScholarships = () => {
    const { user, loading: userLoading, error: authUserError } = useSupabaseAuthUser();
    const { supabase } = useSupabaseClient();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);

    useEffect(() => {
        if (!supabase || userLoading) return;

        const fetchScholarships = async () => {
            try {
                setLoading(true);

                const { data, error: queryError } = await supabase
                    .from('scholarship_providers')
                    .select(`
                        *,
                        scholarship_tags (
                            tags (
                                name
                            )
                        )
                    `);
                
                if (queryError) throw queryError;
                
                if (data) {
                    const formatted: Scholarship[] = data.map(d => ({
                        ...d,
                        tags: d.scholarship_tags ? d.scholarship_tags.map((t: any) => t.tags?.name).filter(Boolean) : [],
                    }));

                    setScholarships(formatted);
                    console.log('scholarship data: ' + JSON.stringify(data));
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : "Failed to fetch scholarship provider data");
                console.log(error instanceof Error ? error.message : "Failed to fetch scholarship data.");
            } finally {
                setLoading(false);
            }
        }
        
        fetchScholarships();
    }, [supabase, user]);

    return { scholarships, loading: loading || userLoading, error: error || authUserError || null };
}