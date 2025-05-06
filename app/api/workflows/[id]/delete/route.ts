import { NextResponse } from 'next/server';
import { NEXT_PUBLIC_SERVER_URI } from '@/secret';

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const data = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`${NEXT_PUBLIC_SERVER_URI}/workflows/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': data.accessToken
            },
            body: "",
            redirect: "follow"
        });

        if (!response.ok) {
            return NextResponse.json({ ...response }, { status: response.status });
        }

        return NextResponse.json({ ...response });
    } catch (error) {
        console.log("[WORKFLOW-DELETE]", error);
        return NextResponse.json({ error: 'Failed to connect to the API' }, { status: 500 });
    }
}
