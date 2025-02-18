import { NextRequest, NextResponse } from "next/server";

const EXPRESS_BACKEND_URL = "http://localhost:5000";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const response = await fetch(`${EXPRESS_BACKEND_URL}/text-summarize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
