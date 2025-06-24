import type { LoginFormData } from "../components/loginForm/schema";

export interface AuthData {
  jwtToken: string;
  roles: string[];
  username: string;
}

export const signin = async (data: LoginFormData) => {
  console.log(data);
  const response = await fetch("http://localhost:8080/signin", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //return await response.json();
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return (await response.json()) as AuthData;
};
/**
 * // authService.ts
export const storeToken = (token: string): void => {
  localStorage.setItem('jwt', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('jwt');
};

export const clearToken = (): void => {
  localStorage.removeItem('jwt');
};

export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
 */

/**
 * http://localhost:8080/signin
 * 
 * {
    "username": "petr",
    "password": "test@123"
   }
 *
 *
 *
 * "jwtToken": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwZXRyIiwiaWF0IjoxNzUwNjM2NTc5LCJleHAiOjE3NTA2NzY1Nzl9.u5rgjhsyev5X98tU1obT4c_Hgn4cvQHBLbulvl2rboPZixbbadCzVJfm1fb6sn94",
    "roles": [
        "ADMIN"
    ],
    "username": "petr"
 */
