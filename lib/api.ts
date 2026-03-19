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
  FILES_UPLOAD_URL: "/files/upload-url",
  FILES_CONFIRM_UPLOAD: "/files/confirm-upload",
};

export interface ApiResult {
  data?: any;
  status: number;
}

export interface SignupParams {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export interface UploadUrlPayload {
  uploadType: "document";
  fileName: string;
  fileType: string;
  documentType: "identity";
}

function getCorrelationId(isRecreated: boolean = false): string {
  const STORAGE_KEY = "client-correlation-id";
  let correlationId = localStorage.getItem(STORAGE_KEY);
  if (!correlationId || isRecreated) {
    correlationId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, correlationId);
  }
  return correlationId;
}

async function safeJson(res: Response): Promise<any> {
  try { return await res.json(); } catch { return undefined; }
}

// --- Public API Functions ---

export async function initSession(body?: any): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId(true);
    const res = await fetch("/api/session-init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, correlationId }),
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function signup({ email, phone, firstName, lastName }: SignupParams): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, firstName, lastName, correlationId }),
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function sendOtp({ email }: { email: string }): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, correlationId }),
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function loginWithOtp({ email, otp }: { email: string; otp: string }): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, correlationId }),
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function getPatientBasic({ email }: { email: string }): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const params = new URLSearchParams({ email, correlationId });
    const res = await fetch(`/api/patients/basic?${params.toString()}`, { method: "GET" });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

// --- Token Refresh Wrapper ---

async function getNewToken(token: string): Promise<{ newToken?: string; status: number }> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, correlationId }),
    });
    const data = await safeJson(res);
    return { newToken: data?.newToken, status: res.status };
  } catch {
    return { status: 500 };
  }
}

/**
 * Calls apiCall with the given token. On 401, refreshes the token and retries once.
 * On refresh failure (401/404), calls on404() and returns null.
 * All token-based API functions must return ApiResult ({ data?, status }).
 */
export async function withTokenRefresh(
  apiCall: (token: string, ...args: any[]) => Promise<ApiResult>,
  token: string,
  args: any[] = [],
  options?: {
    on404?: () => void | Promise<void>;
    onError?: (error: any) => void | Promise<void>;
    getToken?: () => string | null;
    setToken?: (newToken: string) => void;
  }
): Promise<ApiResult | null> {
  const setToken = options?.setToken || ((t: string) => {
    if (typeof window !== "undefined") localStorage.setItem("token", t);
  });

  const result = await apiCall(token, ...args);

  if (result.status === 401) {
    const refreshRes = await getNewToken(token);

    if (refreshRes.newToken) {
      setToken(refreshRes.newToken);
      return await apiCall(refreshRes.newToken, ...args);
    }

    if (refreshRes.status === 401 || refreshRes.status === 404) {
      if (options?.on404) {
        await options.on404();
        localStorage.setItem("token", "");
      }
      return null;
    }

    if (options?.onError) {
      await options.onError(refreshRes);
      localStorage.setItem("token", "");
    }
    return null;
  }

  return result;
}

// --- Token-Based API Functions ---

export async function getPatientData(token: string): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/patients/get-patient-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "x-client-correlation-id": correlationId,
      },
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function answerQuestions(token: string, questions: any, previousMedication?: any): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/questions-answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questions, correlationId, token, previousMedication }),
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function getMembershipPlans(token: string): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/membership-plans", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-client-correlation-id": correlationId,
      },
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function initiateCheckout(token: string, body: any): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/initiate-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, correlationId, token }),
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function updatePatient(token: string, body: any): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/patients/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, correlationId, token }),
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function verifyIdentity(token: string, ssn: string): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/patients/verify-identity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ssn, correlationId, token }),
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function getUploadUrl(token: string, payload: UploadUrlPayload): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/files/upload-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-correlation-id": correlationId,
      },
      body: JSON.stringify({ token, correlationId, ...payload }),
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

/**
 * Uploads a file directly to the S3 presigned URL.
 * Fields from getUploadUrl response must all be appended before the file.
 * S3 returns 204 No Content on success (no JSON body).
 */
export async function uploadFileToPresignedUrl(
  uploadUrl: string,
  fields: Record<string, string>,
  file: File
): Promise<ApiResult> {
  try {
    const formData = new FormData();
    for (const [key, value] of Object.entries(fields)) {
      formData.append(key, value);
    }
    formData.append("file", file);
    const res = await fetch(uploadUrl, { method: "POST", body: formData });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}

export async function confirmUpload(token: string, fileKey: string): Promise<ApiResult> {
  try {
    const correlationId = getCorrelationId();
    const res = await fetch("/api/files/confirm-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-correlation-id": correlationId,
      },
      body: JSON.stringify({ token, correlationId, fileKey }),
    });
    return { data: await safeJson(res), status: res.status };
  } catch {
    return { status: 500 };
  }
}
