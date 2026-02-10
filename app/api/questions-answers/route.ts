import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api';

const BASE_URL = API_CONFIG.BASE_URL;
const SECRET_API_KEY = process.env.SECRET_API_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questions, correlationId, token, previousMedication } = body;
    
    if (!correlationId) {
      return NextResponse.json({ error: 'Correlation ID is required.' }, { status: 400 });
    }
    
    if (!token) {
      return NextResponse.json({ error: 'Authorization token is required.' }, { status: 401 });
    }
    
    if (!questions) {
      return NextResponse.json({ error: 'Questions are required.' }, { status: 400 });
    }

    // Build medicationData if previousMedication exists
    const medicationData: any = {};
    if (previousMedication && previousMedication.currentWeightLoss) {
      console.log("previousMedication::API::Route::", previousMedication);
      medicationData.currentDose = previousMedication.currentDose || null;
      medicationData.currentWeightLoss = previousMedication.currentWeightLoss || null;
      medicationData.dosePreference = previousMedication.dosePreference || null;
    }

    const requestBody = {
      freeFormQuestions: questions,
      medicationData: medicationData
    };
    const res = await fetch(`${BASE_URL}${API_CONFIG.QUESTIONS_ANSWER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': SECRET_API_KEY,
        'x-client-correlation-id': correlationId,
      },
      body: JSON.stringify(requestBody),
    });

    if (res.status === 200) {
      return NextResponse.json(true);
    }
    return NextResponse.json(false);
  } catch (error: any) {
    return NextResponse.json(false);
  }
}

