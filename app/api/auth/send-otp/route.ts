import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    const { email, correlationId } = await req.json();
    
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    
    const res = await fetch(`${BASE_URL}${API_CONFIG.AUTH_SEND_OTP}` ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": SECRET_API_KEY,
        "x-client-correlation-id": correlationId,
      },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data?.error?.message || 'Failed to send OTP.' }, { status: res.status });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error.' }, { status: 500 });
  }
}

