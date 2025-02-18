import { NextRequest, NextResponse } from "next/server";

const EXPRESS_BACKEND_URL = "http://localhost:5000";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const response = await fetch(`${EXPRESS_BACKEND_URL}/doc-summarize`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error( response.statusText );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
