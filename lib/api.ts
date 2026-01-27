// --- API Config ---
export const API_CONFIG = {
  BASE_URL: "https://headless-api.bask.ninja/api/headless/v1",
  SESSION_INIT: "/session/init",
  PATIENTS_BASIC: "/patients/basic",
  PATIENTS_GET_DATA: "/patients/me",
  PATIENTS_Me: "/patients/me",
  AUTH_SIGNUP: "/auth/signup",
  AUTH_SEND_OTP: "/auth/send-otp",
  AUTH_LOGIN: "/auth/login",
  MEMBERSHIP_PLANS: "/membership-plans",
  QUESTIONS_ANSWER: "/questions-answers",
  REFRESH_TOKEN: "/auth/refresh",
  INITIATE_CHECKOUT: "/initiate-checkout",
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

// API Using Token
export async function getPatientData(token: string): Promise<{ patient?: any; error?: any }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/patients/get-patient-data", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "x-client-correlation-id": correlationId 
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: res.status };
    }
    return { patient: data?.data?.patient };
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}

export async function answerQuestions(token: string, questions: any): Promise<{ success?: boolean; error?: any }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/questions-answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questions, correlationId, token })
    });
    if (res.status === 200) {
      return { success: true, error: null };
    }
    return { success: false, error: res.status };
  } catch (error: any) {
    return { success: false, error: error.message || "Network error." };
  }
}

export async function getMembershipPlans(token: string): Promise<{ plans?: any; error?: any }> {
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
      return { error: res.status };
    }
    return { plans: data?.membershipPlans, error: null };
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}

export async function getNewToken(token: string): Promise<{ newToken?: string; error?: string }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, correlationId })
    });
    const data = await res.json();

    if(res.status == 401 || data?.error?.code == "UNAUTHORIZED") {
      return { error: "UNAUTHORIZED" };
    } else {
      return { newToken: data?.newToken };
    }
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}

export async function initiateCheckout(token: string, body: any): Promise<{ data?: any, error?: any }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/initiate-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, correlationId, token })
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: res.status };
    }
    return { data: data?.data, error: null };
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}

export async function updatePatient(token: string, body: any): Promise<{ data?: any, error?: any }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/patients/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, correlationId, token })
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: res.status };
    }
    return { data: data?.data, error: null };
  } catch (error: any) {
    return { error: error.message || "Network error." };
  }
}