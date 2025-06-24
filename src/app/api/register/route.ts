import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log("=== NEXT.JS API ROUTE CALLED ===");

  try {
    const body = await req.json();
    console.log("Request body:", body);

    console.log("Making request to backend...");
    const backendResponse = await fetch('http://localhost:5000/api/rvr/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    console.log("Backend response status:", backendResponse.status);

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.log("Backend error response:", errorText);
      return NextResponse.json(
        { error: `Backend error: ${backendResponse.status} - ${errorText}` },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    console.log("Backend success response:", data);

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Error in Next.js API route:", error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}