import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    // Get body parameters
    const { token, correlationId, city, address, state, zipCode, country, phoneNumber, firstName, lastName, sexAtBirth, dateOfBirth } = await req.json();
    
    // Validate token
    if (!token) {
      return NextResponse.json({ error: 'Authorization token is required.' }, { status: 401 });
    }
    
    // Validate correlation ID
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    
    // Build request body (all fields are optional - only include if provided)
    const requestBody: any = {};
    
    if (city !== undefined) requestBody.city = city;
    if (address !== undefined) requestBody.address = address;
    if (state !== undefined) requestBody.state = state;
    if (zipCode !== undefined) requestBody.zipCode = zipCode;
    if (firstName !== undefined) requestBody.firstName = firstName;
    if (lastName !== undefined) requestBody.lastName = lastName;
    if (sexAtBirth !== undefined) requestBody.sexAtBirth = sexAtBirth;
    if (dateOfBirth !== undefined) requestBody.dateOfBirth = dateOfBirth;
    if (phoneNumber !== undefined) requestBody.phoneNumber = phoneNumber;
    if (country !== undefined) requestBody.country = country;
    
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

