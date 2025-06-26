import type { LoginFormData } from "../components/loginForm/schema";
import type { RegisterFormData } from "../components/registerForm/schema";

export interface AuthData {
  jwtToken: string;
  roles: string[];
  username: string;
}

export const storeToken = (token: string): void => {
  localStorage.setItem("jwt", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("jwt");
};

export const clearToken = (): void => {
  localStorage.removeItem("jwt");
};

export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const signin = async (data: LoginFormData) => {
  console.log(data);
  const response = await fetch("http://localhost:8080/signin", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return (await response.json()) as AuthData;
};

export const register = async (data: RegisterFormData) => {
  const response = await fetch("http://localhost:8080/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  /**
   * {
    "firstName": "first",
    "lastName": "last",
    "password": "password",
    "username": "username",
    "email": "email@me.com",
    "role": "ADMIN"
     }
   */

  console.log(response);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "failed to register");
  }
  return await response.json();
};
