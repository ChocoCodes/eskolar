import { useState, useEffect } from 'react';
import { useSupabaseAuthUser, useSupabaseClient } from './useSupabase';

type ScoreBreakdown = {
    eligibility: number;
    profile: number;
};

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
    e_recommend?: number;
    breakdown?: ScoreBreakdown;
    match?: string;
}

export const useScholarships = () => {
    const { user, loading: userLoading, error: authUserError } = useSupabaseAuthUser();
    const { supabase } = useSupabaseClient();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);

    useEffect(() => {
        if (!supabase || userLoading || !user) return;

        const fetchScholarships = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data: studentData, error: studentError } = await supabase
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
                    .eq('user_id', user.id)
                    .single();
                                
                if (studentError) throw studentError;

                const { data: scholarshipData, error: scholarshipError } = await supabase
                    .from('scholarship_providers')
                    .select('*, scholarship_tags(tags(name))');
                
                if (scholarshipError) throw scholarshipError;

                const formattedScholarships: Scholarship[] = scholarshipData.map(({scholarship_tags, ...d}) => ({
                    ...d,
                    tags: scholarship_tags
                        ? scholarship_tags.map((st: any) => st.tags?.name).filter(Boolean)
                        : [],
                }));
                
                const payload = {
                    student: studentData,
                    scholarships: formattedScholarships
                }

                console.log('Payload: ', JSON.stringify(payload));

                const response = await fetch('/api/recommend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const error = await response.text()
                    throw new Error(error || `Gateway error: Status code ${response.status}`);
                }

                const eRecommendMetrics = await response.json();

                const finalRecommendations = formattedScholarships.map(scholarship => {
                    const matchedMetric = eRecommendMetrics.find((er: any) => er.id === scholarship.id);
                    return {
                        ...scholarship,
                        e_recommend: matchedMetric.e_recommend || 0.0,
                        breakdown: matchedMetric.breakdown || {},
                        match: matchedMetric.match || "Poor"
                    }
                })
                .sort((a,b) => b.e_recommend - a.e_recommend);
                console.log('Final Recommendation' + JSON.stringify(finalRecommendations[0]));
                setScholarships(finalRecommendations);

            } catch (error) {
                setError(error instanceof Error ? error.message : "Failed to fetch scholarship data.");
                console.log(error instanceof Error ? error.message : "Failed to fetch scholarship data.");
            } finally {
                setLoading(false);
            }
        }
        
        fetchScholarships();
    }, [supabase, user]);

    return { scholarships, loading: loading || userLoading, error: error || authUserError || null };
}