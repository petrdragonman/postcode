export interface Postcode {
  id: number;
  postcode: string;
  suburb: string;
  stateCode: StateCode;
}

type StateCode = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "NT" | "ACT";

export const getAllPostcodes = async () => {
  const response = await fetch("http://localhost:8080/postcodes");
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

export const getPostcodeById = async (id: string) => {
  const response = await fetch("http://localhost:8080/postcodes/" + id);
  return await response.json();
};
