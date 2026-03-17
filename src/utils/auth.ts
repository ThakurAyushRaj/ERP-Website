import type { AuthUser } from "../types/erp";

const AUTH_KEY = "erp-auth-user";

export function getAuthUser() {
  const saved = localStorage.getItem(AUTH_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved) as AuthUser;
  } catch {
    return null;
  }
}

export function setAuthUser(user: AuthUser) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearAuthUser() {
  localStorage.removeItem(AUTH_KEY);
}
