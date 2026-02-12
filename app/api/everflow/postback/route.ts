import { NextResponse } from 'next/server';

const EVERFLOW_BASE_URL = 'https://www.qt3fqt8trk.com';
const VERIFICATION_TOKEN = '0H8TJaqaogZ9yVktWBJJhRAytNnL86';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { event_type, transaction_id, user_id, email, firstName, lastName, phone, amount, order_id } = body;
    
    if (!event_type || !transaction_id) {
      return NextResponse.json({ error: 'event_type and transaction_id are required' }, { status: 400 });
    }
    
    let url: string;
    
    switch (event_type) {
      case 'quiz_start':
        url = `${EVERFLOW_BASE_URL}/?nid=3910&aid=3&adv_event_id=6&transaction_id=${encodeURIComponent(transaction_id)}&verification_token=${VERIFICATION_TOKEN}`;
        break;
        
      case 'bmi':
        url = `${EVERFLOW_BASE_URL}/?nid=3910&aid=3&adv_event_id=3&transaction_id=${encodeURIComponent(transaction_id)}&verification_token=${VERIFICATION_TOKEN}`;
        break;
        
      case 'lead':
        {
          const params = new URLSearchParams({
            nid: '3910',
            aid: '3',
            adv_event_id: '4',
            transaction_id: transaction_id,
            verification_token: VERIFICATION_TOKEN,
          });
          if (user_id) params.append('user_id', user_id);
          if (email) params.append('adv1', email);
          if (firstName) params.append('adv2', firstName);
          if (lastName) params.append('adv3', lastName);
          if (phone) params.append('adv4', formatPhone(phone));
          url = `${EVERFLOW_BASE_URL}/?${params.toString()}`;
        }
        break;
        
      case 'add_to_cart':
        {
          const params = new URLSearchParams({
            nid: '3910',
            aid: '3',
            adv_event_id: '5',
            transaction_id: transaction_id,
            verification_token: VERIFICATION_TOKEN,
          });
          if (user_id) params.append('user_id', user_id);
          if (email) params.append('adv1', email);
          if (firstName) params.append('adv2', firstName);
          if (lastName) params.append('adv3', lastName);
          if (phone) params.append('adv4', formatPhone(phone));
          url = `${EVERFLOW_BASE_URL}/?${params.toString()}`;
        }
        break;
        
      case 'purchase':
        {
          const params = new URLSearchParams({
            nid: '3910',
            transaction_id: transaction_id,
            verification_token: VERIFICATION_TOKEN,
          });
          if (amount !== undefined) params.append('amount', amount.toString());
          if (order_id) params.append('order_id', order_id);
          if (email) params.append('adv1', email);
          if (firstName) params.append('adv2', firstName);
          if (lastName) params.append('adv3', lastName);
          if (phone) params.append('adv4', formatPhone(phone));
          url = `${EVERFLOW_BASE_URL}/?${params.toString()}`;
        }
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid event_type' }, { status: 400 });
    }
    
    console.log("url::", url);

    // Fire postback to Everflow
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Wellinc-Server/1.0',
      },
    });
    
    if (response.ok) {
      return NextResponse.json({ success: true, event_type, transaction_id });
    } else {
      console.error('Everflow postback failed:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Everflow postback failed', status: response.status },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error firing Everflow postback:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  if (phone.startsWith('+1')) {
    return phone;
  }
  return digits.length >= 10 ? `+1${digits.slice(-10)}` : phone;
}

