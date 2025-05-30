import { NextResponse, NextRequest } from 'next/server';
import { NEXT_PUBLIC_SERVER_URI } from '@/secret';
import axios from 'axios';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${NEXT_PUBLIC_SERVER_URI}/requests/quality-assurance/${data.id}`,
            headers: {
                'Authorization': data.accessToken,
                'Content-Type': 'application/json',
            },
            data: {
                type: data.type, // Include the type in the request body
            }
        };

        const resultData = await axios.request(config);

        return NextResponse.json(resultData.data);
    } catch (error) {
        console.log("[REQUESTS-QA]", error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

