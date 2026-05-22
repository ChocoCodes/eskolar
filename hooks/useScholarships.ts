import { useState, useEffect } from 'react';
import { useSupabaseAuthUser, useSupabaseClient } from './useSupabase';
import { getStudentProfileQuery } from '@/lib/supabase/query';

type ScoreBreakdown = {
    eligibility: number;
    profile: number;
    academic: number;
    income: number;
    bonus: number;
};

export interface Scholarship {
    id: number;
    provider_name: string;
    program_img_url: string;
    award_value: number;
    slots: number;
    tags: string[];
    breakdown?: ScoreBreakdown;
    program_name: string;
    status: string;
    grant_type: string;
    deadline: string;
    cutoff_grade: number;
    description: string;
    annual_family_income: number | null;
    eligibility: string;
    e_recommend?: number;
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

                const { data: studentData, error: studentError } = await getStudentProfileQuery(supabase, user.id);
                                
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