// --- API Config ---
export const API_CONFIG = {
  BASE_URL: "https://headless-api.bask.ninja/api/headless/v1",
  SESSION_INIT: "/session/init",
  PATIENTS_BASIC: "/patients/basic",
  AUTH_SIGNUP: "/auth/signup",
  AUTH_SEND_OTP: "/auth/send-otp",
  AUTH_LOGIN: "/auth/login",
  MEMBERSHIP_PLANS: "/membership-plans",
};

// --- API Functions ---
export interface SignupParams {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

// Helper function to get or generate correlation ID
function getCorrelationId(): string {
  const STORAGE_KEY = "client-correlation-id";
  
  let correlationId = localStorage.getItem(STORAGE_KEY);
  if (!correlationId) {
    // Generate UUID v4
    correlationId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, correlationId);
  }
  return correlationId;
}

export async function initSession(body?: any): Promise<{ success?: boolean; error?: string }> {
  try {
    const correlationId = getCorrelationId();
    
    const res = await fetch("/api/session-init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, correlationId })
    });
    
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Session initialization failed." };
    }
    if (data === true) {
      return { success: true };
    }
    return { success: false };
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}

export async function getPatientBasic({ email }: { email: string }): Promise<{ patientExists?: boolean; error?: string }> {
  try {
    const correlationId = getCorrelationId();
    const params = new URLSearchParams({ email, correlationId });
    const res = await fetch(`/api/basic?${params.toString()}`, {
      method: "GET",
    });
    
    const data = await res.json();
    console.log("client data: ", data);
    if (!res.ok) {
      return { error: data.error || "Failed to check patient." };
    }
    return { patientExists: data };
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}

export async function signup({ email, phone, firstName, lastName }: SignupParams): Promise<{ token?: string; error?: string }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, firstName, lastName, correlationId })
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Signup failed." };
    }
    return { token: data?.token };
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}

export async function sendOtp({ email }: { email: string }): Promise<{ success?: boolean; error?: string }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, correlationId })
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Failed to send OTP." };
    }
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}

export async function loginWithOtp({ email, otp }: { email: string; otp: string }): Promise<{ token?: string; error?: string }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, correlationId })
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Login failed." };
    }
    return { token: data?.token };
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}

export async function getMembershipPlans(token: string): Promise<{ plans?: any; error?: string }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/membership-plans", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-client-correlation-id": correlationId
      }
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Failed to fetch membership plans." };
    }
    return { plans: data };
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}