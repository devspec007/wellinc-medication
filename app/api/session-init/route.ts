import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { correlationId, ...requestBody } = body;
    
    if (!correlationId) {
      return NextResponse.json(false, { status: 400 });
    }
    
    const res = await fetch(`${BASE_URL}${API_CONFIG.SESSION_INIT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": SECRET_API_KEY,
        "x-client-correlation-id": correlationId,
      },
      body: JSON.stringify(requestBody)
    });
    
    if (res.status === 200) {
      return NextResponse.json(true);
    }
    
    return NextResponse.json(false);
  } catch (error: any) {
    return NextResponse.json(false);
  }
}

