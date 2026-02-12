// Everflow tracking utility functions
export interface EverflowPostbackParams {
  transaction_id: string;
  user_id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  amount?: number;
  order_id?: string;
}

/**
 * Get transaction_id from localStorage
 * Returns null if not available (user didn't come from Everflow link)
 */
export function getEverflowTransactionId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('everflow_transaction_id');
}

/**
 * Format phone number to +1XXXXXXXXXX format
 */
export function formatPhoneForEverflow(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If it's 10 digits, add +1 prefix
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  // If it's 11 digits and starts with 1, add + prefix
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  // If it already has +1, return as is
  if (phone.startsWith('+1')) {
    return phone;
  }
  
  // Default: try to format
  return digits.length >= 10 ? `+1${digits.slice(-10)}` : phone;
}
