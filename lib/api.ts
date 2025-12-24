// --- API Config ---
export const API_CONFIG = {
  BASE_URL: "https://headless-api.bask.ninja/api/headless/v1",
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

export async function signup({ email, phone, firstName, lastName }: SignupParams): Promise<{ token?: string; error?: string }> {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, firstName, lastName })
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
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
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
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
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
    const res = await fetch("/api/membership-plans", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
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
