import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function GET(req: Request) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization token is required.' }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');
    
    // Get correlation ID from header
    const correlationId = req.headers.get('x-client-correlation-id');
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    
    const res = await fetch(`${BASE_URL}${API_CONFIG.PATIENTS_GET_DATA}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': SECRET_API_KEY,
        'x-client-correlation-id': correlationId,
      },
    });
    
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error || data.message || 'Failed to fetch patient data.' }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error.' }, { status: 500 });
  }
}

