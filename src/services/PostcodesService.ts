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
