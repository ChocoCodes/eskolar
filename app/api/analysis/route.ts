import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try { 
        const { student, scholarship, breakdown } = await request.json();

        const result = await fetch(`${ process.env.NEXT_PUBLIC_API_ENDPOINT as string }/explain`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ student, scholarship, breakdown })
        });

        const data = await result.json();
        return NextResponse.json({ data }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json(
            { message: error instanceof Error ? `${ error.message }` : 'An error occured when connecting to the eSbot server.'}, 
            { status: 400 }
        );
    }
}