import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    // Get body parameters
    const { token, correlationId, city, address, state, zipCode, country, phoneNumber } = await req.json();
    
    // Validate token
    if (!token) {
      return NextResponse.json({ error: 'Authorization token is required.' }, { status: 401 });
    }
    
    // Validate correlation ID
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    
    // Validate required fields
    if (!city || city.trim() === "") {
      return NextResponse.json({ error: 'city is required.' }, { status: 400 });
    }
    
    if (!address || address.trim() === "") {
      return NextResponse.json({ error: 'address is required.' }, { status: 400 });
    }
    
    if (!state || state.trim() === "") {
      return NextResponse.json({ error: 'state is required.' }, { status: 400 });
    }
    
    if (!zipCode || zipCode.trim() === "") {
      return NextResponse.json({ error: 'zipCode is required.' }, { status: 400 });
    }
    
    // Build request body (country and phoneNumber are optional)
    const requestBody: any = {
      city,
      address,
      state,
      zipCode,
    };
    
    if (country) {
      requestBody.country = country;
    }
    
    if (phoneNumber) {
      requestBody.phoneNumber = phoneNumber;
    }
    
    const res = await fetch(`${BASE_URL}${API_CONFIG.PATIENTS_Me}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': SECRET_API_KEY,
        'x-client-correlation-id': correlationId,
      },
      body: JSON.stringify(requestBody),
    });
    
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error || data.message || 'Failed to update patient data.' }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error.' }, { status: 500 });
  }
}

