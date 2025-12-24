export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
}

export function getPlanColors(planKey: string) {
  if (!planKey) return { backgroundColor: "#ffffff", color: "#000000" };

  if (planKey?.toLowerCase().includes("semaglutide")) {
    return {
      backgroundColor: "#bed4cb",
      secondBgColor: "#c8dfd6",
      thirdBgColor: "#deece6",
      color: "#1f3e5b",

    };
  } else if (planKey?.toLowerCase().includes("tirzepatide")) {
    return {
      backgroundColor: "#0092bd",
      secondBgColor: "#009ac7",
      thirdBgColor: "#66c2dd",
      color: "#ffffff",
    };
  }
  return { backgroundColor: "#ffffff", color: "#000000" };
};
