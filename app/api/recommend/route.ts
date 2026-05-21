import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_E_RECOMMEND as string}/api/v1/health`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-store, max-age=0'
            }
        });

        if (!response.ok) {
            throw new Error(`eRecommend engine returned status code ${response.status}`)
        }

        const health = await response.json();
        return NextResponse.json(health);
    } catch (error) {
        console.error('Error in GET route: ' + error);
        return NextResponse.json({ 
            status: "unhealthy", 
            message: error instanceof Error ? error.message : 'FastAPI microservice is unreachable.'
        }, { status: 503 });
    }
}

export async function POST(request: Request) {
    try {
        const { student, scholarships } = await request.json();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_E_RECOMMEND as string}/api/v1/recommend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ student, scholarships })
        });

        if (!response.ok) {
            const eRecommendError = await response.text();
            throw new Error(eRecommendError || `eRecommend engine responded with status code ${response.status}`);
        }

        const recommendations = await response.json();
        return NextResponse.json(recommendations);
    } catch (error) {
        console.error('Error in POST route: ' + error);
        return NextResponse.json({ message: error instanceof Error ? error.message : 'An error occured while fetching data.'}, { status: 500 });
    }
}