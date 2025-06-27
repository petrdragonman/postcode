import { getAuthHeader } from "./AuthService";

export interface Postcode {
  id: number;
  postcode: string;
  suburb: string;
  stateCode: StateCode;
}

export type StateCode =
  | "NSW"
  | "VIC"
  | "QLD"
  | "SA"
  | "WA"
  | "TAS"
  | "NT"
  | "ACT";

export const getAllPostcodes = async () => {
  const response = await fetch("http://localhost:8080/postcodes", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 401) throw new Error("Unauthorized...");
  return await response.json();
};

export const getPostcodeBySuburb = async (sub: string) => {
  const response = await fetch("http://localhost:8080/postcodes/suburb/" + sub);
  return await response.json();
};

export const getPostcodeByCode = async (code: string) => {
  const response = await fetch(
    "http://localhost:8080/postcodes/postcode/" + code
  );
  return await response.json();
};

export const getPostcodeById = async (id: number) => {
  const response = await fetch("http://localhost:8080/postcodes/" + id);
  return await response.json();
};

export const createPostcode = async (data: Postcode) => {
  const response = await fetch("http://localhost:8080/postcodes", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });
  return await response.json();
};

export const deletePostcode = async (id: number) => {
  const response = await fetch("http://localhost:8080/postcodes/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });
  return await response.json();
};

export const updatePostcode = async (id: number, data: any) => {
  const response = fetch("http://localhost:8080/postcodes/" + id, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });
  return (await response).json();
};
