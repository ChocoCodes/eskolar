import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { query } = await request.json();
        if (!query) {
            return NextResponse.json(
                { message: 'Query string is required.' }, 
                { status: 400 }
            );
        }

        const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT as string}/query`, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ query })
        });

        const data = await result.json();
        return NextResponse.json({ response: data.response }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json(
            { message: error instanceof Error ? `${ error.message }` : 'An error occured when connecting to the API.'}, 
            { status: 400 }
        );
    }
}