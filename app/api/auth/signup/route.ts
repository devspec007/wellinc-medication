import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    const { email, phone, firstName, lastName, correlationId } = await req.json();
    
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    
    const res = await fetch(`${BASE_URL}${API_CONFIG.AUTH_SIGNUP}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": SECRET_API_KEY,
        "x-client-correlation-id": correlationId,
      },
      body: JSON.stringify({ email, phoneNumber: phone, firstName, lastName, testModeEnabled: true })
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      return NextResponse.json({ error: data?.error?.message || 'Signup failed.' }, { status: res.status });
    }
    return NextResponse.json({ token: data?.data?.token});
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error.' }, { status: 500 });
  }
}

