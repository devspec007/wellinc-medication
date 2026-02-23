import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    // Get body parameters
    const { token, correlationId, ssn } = await req.json();
    
    // Validate token
    if (!token) {
      return NextResponse.json({ error: 'Authorization token is required.' }, { status: 401 });
    }
    
    // Validate correlation ID
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }

    // Validate SSN
    if (!ssn) {
      return NextResponse.json({ error: 'SSN is required.' }, { status: 400 });
    }
    
    const res = await fetch(`${BASE_URL}/patients/me/verify-identity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': SECRET_API_KEY,
        'x-client-correlation-id': correlationId,
      },
      body: JSON.stringify({ ssn }),
    });
    
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error || data.message || 'Failed to verify identity.' }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error.' }, { status: 500 });
  }
}

