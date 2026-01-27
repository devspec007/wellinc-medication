import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const correlationId = searchParams.get('correlationId');
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }
    
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    console.log("correlationId: ", correlationId);
    console.log("email: ", email);
    const params = new URLSearchParams({ email });
    const res = await fetch(`${BASE_URL}${API_CONFIG.PATIENTS_BASIC}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SECRET_API_KEY,
        'x-client-correlation-id': correlationId,
      },
    });
    
    const data = await res.json();
    if (res.status === 200) {
      return NextResponse.json(data.data.patientExists);
    }
    return NextResponse.json({ error: data.error || data.message || 'Failed to check patient.' }, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error.' }, { status: 500 });
  }
}

