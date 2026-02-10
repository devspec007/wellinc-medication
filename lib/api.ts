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
function getCorrelationId(isRecreated: boolean = false): string {
  const STORAGE_KEY = "client-correlation-id";
  
  let correlationId = localStorage.getItem(STORAGE_KEY);
  if (!correlationId || isRecreated) {
    // Generate UUID v4
    correlationId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, correlationId);
  }

  return correlationId;
}

export async function initSession(body?: any): Promise<{ success?: boolean; error?: string }> {
  try {
    const correlationId = getCorrelationId(true);
    
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
    const res = await fetch(`/api/patients/basic?${params.toString()}`, {
      method: "GET",
    });
    
    const data = await res.json();
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

export async function answerQuestions(token: string, questions: any, previousMedication?: any): Promise<{ success?: boolean; error?: any }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/questions-answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questions, correlationId, token, previousMedication })
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

export async function getNewToken(token: string): Promise<{ newToken?: string; status?: any }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, correlationId })
    });

    const data = await res.json();
    return { newToken: data?.newToken, status: res.status };
  } catch (error: any) {
    return { status: 500 };
  }
}

// --- Token Refresh Wrapper ---
/**
 * Wrapper function that automatically handles token refresh on 401 errors.
 * 
 * @param apiCall - The API function to call (must accept token as first parameter)
 * @param token - The current authentication token
 * @param args - Additional arguments to pass to the API function (after token)
 * @param options - Optional configuration for error handling
 * @returns The result from the API call, or null if error handling redirects
 * 
 * @example
 * const result = await withTokenRefresh(
 *   getPatientData,
 *   token,
 *   [],
 *   { on404: () => router.push("/intake/contact") }
 * );
 */
export async function withTokenRefresh<T extends (...args: any[]) => Promise<any>>(
  apiCall: T,
  token: string,
  args: Parameters<T> extends [string, ...infer Rest] ? Rest : never[] = [] as any,
  options?: {
    on404?: () => void | Promise<void>;
    onError?: (error: any) => void | Promise<void>;
    getToken?: () => string | null;
    setToken?: (newToken: string) => void;
  }
): Promise<ReturnType<T> | null> {
  const getToken = options?.getToken || (() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("token");
    }
    return null;
  });
  
  const setToken = options?.setToken || ((newToken: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("token", newToken);
    }
  });

  // First attempt with current token
  const result = await apiCall(token, ...args) as Awaited<ReturnType<T>>;

  // Check if we got a 401 error
  if (result && typeof result === 'object' && 'error' in result && result.error === 401) {
    // Try to refresh the token
    const newTokenDataRes = await getNewToken(token);
    
    if (newTokenDataRes?.newToken) {
      // Update token in storage
      setToken(newTokenDataRes.newToken);
      
      // Retry the API call with new token
      const retryResult = await apiCall(newTokenDataRes.newToken, ...args) as Awaited<ReturnType<T>>;
      return retryResult;
    }

    // Handle 404 from token refresh (token not found/invalid)
    if (newTokenDataRes?.status === 404) {
      if (options?.on404) {
        await options.on404();
      }
      return null;
    }

    // Handle other token refresh errors
    if (options?.onError) {
      await options.onError(newTokenDataRes);
    }
    return null;
  }

  return result;
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